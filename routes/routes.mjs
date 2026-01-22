import { json, response, Router } from "express";
import { getContacts,
         getContact,
         createContact,
         createContacts,
         updateContact,
         deleteContact
        } from "../controller/contactController.mjs";


const router = Router();

//@Public router entry.
//@get contacts
router.get("/",(getContacts));
router.post("/api/contact",(createContacts));
//@get contact by ID
router.get("/:id",(getContact));
router.post("/:id", (createContact));
router.put("/:id", (updateContact));
router.delete("/:id", (deleteContact));


export default router