import { Router } from "express";
import { getCategories, getEditCategory, postDeleteCategory, postUpdateCategory, postCategories } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories)
categoryRouter.get("/:id", getEditCategory)
categoryRouter.post("/editCategory/:id", postUpdateCategory)
categoryRouter.post("/deleteCategory/:id", postDeleteCategory)
categoryRouter.post("/", postCategories)

export default categoryRouter;
