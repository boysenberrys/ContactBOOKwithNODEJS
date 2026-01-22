import expressAsyncHandler from "express-async-handler";
import { Contact } from "../models/contactModels.mjs";


// @desc get all contacts
// @routes GET /api/contacts
//@access public
export const getContacts = expressAsyncHandler(async(request, response)=>{
    const contacts = await Contact.find();
    response.status(200).json(contacts)
});

// @desc get all contacts
// @routes POST /api/contacts
//@access public
export const createContacts = expressAsyncHandler(async(request, response)=>{
   
    const { name, email, phone } = request.body;
    // controll flows
    if(!name || !email || !phone){
        response.status(400);
        throw new Error("all field are mandatory")
    }
    const contact = await Contact.create({
        name, email,phone
    })

    response.status(201).json({message: "contact created"})
});

// @desc get  contacts by id
// @routes GET /api/contacts:id
//@access public
export const getContact = expressAsyncHandler(async(request, response)=>{
    // use async await to fetch contact in the database
    const contact = await Contact.findById(request.params.id);

    //if contact not found in the database
    if(!contact){
        response.status(404);
        throw new Error("Contact not available");
    }
    //if contact found, return the found contact
    response.status(200).json(contact);
});


// @desc update contact by id
// @routes PUT /api/contacts:id
//@access public
export const updateContact = expressAsyncHandler(async(request, response)=>{
    response.status(200).json({message: `Update contact for ${request.params.id}`})
});

// @desc delete contact by id
// @routes DELETE /api/contacts:id
//@access public
export const deleteContact = expressAsyncHandler(async(request, response)=>{
    response.status(200).json({message: `Deleted contact for ${request.params.id}`})
})