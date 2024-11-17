import { queryPostUpdateCategory, queryCategories, queryCategory, queryCreateCategory } from "../db/quieres.js";
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
    const { rows: categories } = await queryCategories();
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
            await queryCreateCategory(type);
            res.redirect("/");
        }
    },
];

export async function getEditCategory(req, res) {
    const { id } = req.params;
    const { rows: category} = await queryCategory(id)
    const { type, category_id } = category[0]
    res.render("editCategory", {type: type, category_id: category_id});
}

export async function postUpdateCategory(req, res) {
    const { id: category_id } = req.params
    const { type } = req.body
    await queryPostUpdateCategory(type, category_id)

    res.redirect("/categories")
}
