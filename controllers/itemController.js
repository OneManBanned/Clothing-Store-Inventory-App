import { queryCreateItem, queryCategory, queryItems } from "../db/quieres.js";
import { body, validationResult } from "express-validator";

const validateData = [
    body("name")
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("This is meant to be Alphanumeric characters only"),
];

export async function getItems(req, res) {
    const { rows: items } = await queryItems();
    const { rows: categories } = await queryCategory();
    res.render("items", { items: items, categories: categories });
}

export const postItems = [
    validateData,
    async (req, res, next) => {
        const { name, color, size, price, category } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("index", { errors: errors.array() });
        } else {
        await queryCreateItem(name, color, size, price, category);
        res.redirect("/");
        }
    },
];
