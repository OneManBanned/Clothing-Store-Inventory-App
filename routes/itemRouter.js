import express, { Router } from "express";
import { getItems, postItems, deleteItem, updateItem, postUpdateItem } from "../controllers/itemController.js";

const itemRouter = Router();
itemRouter.use(express.static("../public"))

itemRouter.get("/", getItems)
itemRouter.get("/:id", updateItem)
itemRouter.post("/delete/:id", deleteItem)
itemRouter.post("/updateItem/:id", postUpdateItem)
itemRouter.post("/", postItems)

export default itemRouter;
