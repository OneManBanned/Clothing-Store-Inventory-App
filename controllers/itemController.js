import {
    queryDeleteItem,
    queryPostUpdateItem,
    queryCreateItem,
    queryItem,
    queryCategory,
    queryItems,
} from "../db/quieres.js";

import { body, validationResult } from "express-validator";

const validateBody = [
    body("name")
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("This is meant to be Alphanumeric characters only"),
    body("color")
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("This is meant to be Alphanumeric characters only"),
    body("size")
        .trim()
        .notEmpty()
        .isInt()
        .withMessage("This is meant to be a number"),
    body("price").trim().isDecimal().withMessage("price is meant to be decimal"),
    body("category").notEmpty().withMessage("enter a category"),
];

export async function getItems(req, res) {
    const { rows: items } = await queryItems();
    const { rows: categories } = await queryCategory();
    res.render("items", { items: items, categories: categories });
}

export const postItems = [
    validateBody,
    async (req, res) => {
        const { name, color, size, price, category } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("index", { errors: errors.array() });
        } else {
            await queryCreateItem(name, color, size, price, category);
            res.redirect("/items");
        }
    },
];

export async function updateItem(req, res) {
    const { id } = req.params;
    const { rows: item } = await queryItem(id);
    const { rows: categories } = await queryCategory();
    const { name, color, size, price, type, item_id } = item[0];
    res.render("editItem", {
        name: name,
        color: color,
        size: size,
        price: price,
        type: type,
        categories: categories,
        item_id: item_id,
    });
}

export const postUpdateItem = [
    validateBody,
    async (req, res) => {
        const { name, color, size, price, category } = req.body;
        const { id: item_id } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render("index", { errors: errors.array() });
        } else {
            await queryPostUpdateItem(item_id, name, color, size, price, category);
            res.redirect("/items");
        }
    },
];

export async function deleteItem(req, res) {
    console.log("HELLOE!!!", req.params);
    const { id: item_id } = req.params;
    await queryDeleteItem(item_id)
    res.redirect("/items")
}
