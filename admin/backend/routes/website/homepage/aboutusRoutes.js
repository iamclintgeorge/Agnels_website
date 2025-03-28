import express from "express";
import { principalDisplayController } from "../../../controllers/website/aboutusController.js";

const router = express.Router();

router.get("/principaldesk", principalDisplayController);

export default router;
