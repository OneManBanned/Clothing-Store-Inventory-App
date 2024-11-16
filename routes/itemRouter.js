import { Router } from "express";
import { getItems, postItems } from "../controllers/itemController.js";

const itemRouter = Router();

itemRouter.get("/", getItems)
itemRouter.post("/", postItems)

export default itemRouter;
