import express from "express";
import { handleGenerateNewShortUrl } from "../controllers/urls.js";

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

export default router;
