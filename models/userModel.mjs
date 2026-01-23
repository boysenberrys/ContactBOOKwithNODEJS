import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: "string",
        required: [true, "please enter your username"]
    },
    email: {
        type: "string",
        required: [true, "please enter email adress"],
        unique: [true, "User email already exist, please enter valid email"]
    },
    password: {
        type: "string",
        required: [true, "please enter password"]
    }
    
},
{
    timestamps:true,
}
);

export const User = mongoose.model("usersModel", userSchema);