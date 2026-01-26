import Router  from "express";
import {
  getContacts,
  getContact,
  createContacts,
  updateContact,
  deleteContact
} from "../controller/contactController.mjs";
import { validateToken } from "../middlewares/validateControrHnadler.mjs";

const router = Router();
//middleware to validate token for all endpoint
router.use(validateToken);

/// /api/contacts

router.get("/contacts", getContacts);
router.post("/contacts", createContacts);

// /api/contacts/:id
router.get("/contacts/:id", getContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router