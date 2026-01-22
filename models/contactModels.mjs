import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name:{
        type: "string",
        required: [true, "please add the contact name"]
    },
    email:{
        type:"string",
        required: [true, "please add your email"]
    },
    phone: {
        type: "string",
        required: [true, "please add your phone number"]
    }
},
{
    timestamps:true,
}
);

// compille schema into mongo model
export const Contact = mongoose.model("contactModel", contactSchema)