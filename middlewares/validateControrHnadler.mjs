import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateToken = expressAsyncHandler(async(request, response, next)=>{
    let token;
    let authHeader = request.headers.authorization || request.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err){
                response.status(400);
                throw new Error("User not authorised")
            } 
            request.user = decoded.user;
            next();
        })
    }
})