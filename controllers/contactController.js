// This file is responsible for storing the logic and access with mongodb database ..like a brain

//since we also use mongodb so the request are promise based therefore we need to use exception handler. use any one try catch or express-async-handler
const asyncHandler = require("express-async-handler"); // responsible for handling error using express same as try catch block but in clean way 
const Contact = require("../models/contactModel");  //importing Contact model from contactModel file


//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res)=> {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res)=> {
    console.log("The request body is :", req.body);

    const {name, email, phone} = req.body;
    if(!name || !email || !phone){      //error handling
        res.status(400);
        // res.send({msg: "error"})
        throw new Error("All fields are mandatory !!")
    }
    const contact = await Contact.create({
        name: name,
        email: email,
        phone: phone
    })
    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !")
    }

    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    const deletedContact = await Contact.findByIdAndDelete(
        req.params.id,
        {new: true}
    )
    res.status(200).json(deletedContact);
});

module.exports = {getContacts, createContact,getContact,updateContact,deleteContact}