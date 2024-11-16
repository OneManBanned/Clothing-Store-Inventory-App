import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories)
categoryRouter.post("/", postCategories)

export default categoryRouter;
