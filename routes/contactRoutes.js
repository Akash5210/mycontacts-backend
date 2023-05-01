// this file is responsible for storing all the routes i.e. endpoints and methods
const express = require("express");
const router = express.Router();
const { getContacts,
    createContact, 
    getContact,
    updateContact,
    deleteContact } = require("../controllers/contactController");


router.route("/").get(getContacts);

router.route("/").post(createContact);

// the above two routes have the route so,it can be written as shorthand also like 
// router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

module.exports = router;