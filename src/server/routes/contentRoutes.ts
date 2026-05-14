import { Router } from "express";
import { getContent } from "../controllers/contentController.js";

export const contentRoutes = Router();

contentRoutes.get("/", getContent);
