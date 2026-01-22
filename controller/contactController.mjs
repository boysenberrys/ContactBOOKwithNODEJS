import expressAsyncHandler from "express-async-handler";

// @desc get all contacts
// @routes GET /api/contacts
//@access public
export const getContacts = expressAsyncHandler(async(request, response)=>{
    response.status(200).json({message: "get all contacts"})
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
    response.status(201).json({message: "contact created"})
});

// @desc get  contacts by id
// @routes GET /api/contacts:id
//@access public
export const getContact = expressAsyncHandler(async(request, response)=>{
    response.status(200).json({message: `Get contacts for ${request.params.id}`})
});


// @desc create contact by id
// @routes POST /api/contacts:id
//@access public
export const createContact = expressAsyncHandler(async(request, response)=>{
   
    response.status(200).json({message: `Create contacts for ${request.params.id}`})
    
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