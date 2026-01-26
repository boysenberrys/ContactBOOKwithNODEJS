import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc register new user
// @routes POST /api/users/register
//@access public
export const registerUsers = expressAsyncHandler(async(request, response)=>{
    const { username, email, password } = request.body;
    if(!username || !email || !password){
        response.status(401);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        response.status(403);
        throw new Error ("Email already exist, please use another email")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    //create a new user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if(newUser){
        response.status(201);
        response.json({_userId: newUser.id, userEmail: newUser.email})
    } else{
        response.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc login user
// @routes POST /api/users/login
//@access public
export const loginUser = expressAsyncHandler(async(request, response)=>{
    const { email, password } = request.body;
    if(!email || !password){
        response.status(400);
        throw new Error("All credentials are mandatory");
    }
    //Check if user is available in the database;
    const loginUser =  await User.findOne({email});
    

    //if user is in database compare password with hash password
    if( loginUser && (await bcrypt.compare(password, loginUser.password))){
        const accessToken = jwt.sign({
            user: {
                username: loginUser.username,
                email: loginUser.email,
                id: loginUser.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}

     );

        response.status(200).json({ accessToken });
    } else{
        response.status(400);
        throw new Error("Bad credentials")
    }
    response.json({message: "logged in"});
});

//@desc current user
// @routes POST /api/users/current
//@access private
export const currentUser = expressAsyncHandler(async(request, response)=>{
    response.json({message: "You are already signed in!"})
});
