import { queryCategory, queryCreateCategory} from "../db/quieres.js";
import { body, validationResult } from "express-validator";

const validateCategory = [
    body("type")
        .trim()
        .notEmpty()
        .withMessage("type is required")
        .isAlpha()
        .withMessage("type must consist of alphanumeric letters"),
];

export async function getCategories(req, res) {
    const { rows: categories } = await queryCategory();
    res.render("categories", { categories: categories });
}

export const postCategories = [
    validateCategory,
    async function(req, res) {
        const { type } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("index", { errors: errors.array() });
        } else {
            await queryCreateCategory(type)
            res.redirect("/");
        }
    },
];
