import { Router } from "express";
import { getItems, postItems, updateItem, postUpdateItem } from "../controllers/itemController.js";

const itemRouter = Router();

itemRouter.get("/", getItems)
itemRouter.get("/:id", updateItem)
itemRouter.post("/updateItem/:id",postUpdateItem)
itemRouter.post("/", postItems)

export default itemRouter;
