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
    //find contact by id from parameter;
    const contact = await Contact.findById(request.params.id);
    if(!contact){
        response.status(400);
        throw new Error("Contact not available!");
    }
    // if contact is vaialble, proceed to updating by using findByIdAndUpdate;
    const updatedContact = await Contact.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    );
    // what's working under the hook?
            // database received id from params, update the record in the DB with new body content, then it return new contact { new: true}, if you put { new: flase} it return the old document.
    response.status(200).send(updatedContact);

});

// @desc delete contact by id
// @routes DELETE /api/contacts/:id
//@access public
export const deleteContact = expressAsyncHandler(async(request, response)=>{
    // find contact in the database by using ID fro params;
    const contact = Contact.findById(request.params.id);
    if(!contact){
        response.status(400);
        throw new Error("Contact not found");
    }

    // delete the found contact
    await contact.deleteOne();
    response.status(200).json({message: `Deleted contact for ${contact}`})

    // ALTENATIVE- you can use this short without middleware
    //const contact = await Contact.findByIdAndDelete(request.params.id);
    // if(!contact){
    //    reponse.status(400)
    //    throw new Error("Contact not found!")}
})