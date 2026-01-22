import { json, response, Router } from "express";
import {
  getContacts,
  getContact,
  createContacts,
  updateContact,
  deleteContact
} from "../controller/contactController.mjs";

const router = Router();

/// /api/contacts
router.get("/contacts", getContacts);
router.post("/contacts", createContacts);

// /api/contacts/:id
router.get("/contacts/:id", getContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router