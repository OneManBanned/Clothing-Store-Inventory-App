import {
  queryDeleteCategory,
  queryPostUpdateCategory,
  queryCategories,
  queryCategory,
  queryCreateCategory,
} from "../db/quieres.js";
import { body, param, validationResult } from "express-validator";

const validateParam = [param("id").isInt()];

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
  async function (req, res) {
    const { type } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).render("index", { errors: errors.array() });
    } else {
      await queryCreateCategory(type);
      res.redirect("/categories");
    }
  },
];

export const getEditCategory = [
  validateParam,
  async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.redirect("/404")
    } else {
      const { rows: category } = await queryCategory(id);
      const { type, category_id } = category[0];
      res.render("editCategory", { type: type, category_id: category_id });
    }
  },
];

export const postUpdateCategory = [
  validateCategory,
  async (req, res) => {
    const { id: category_id } = req.params;
    const { type } = req.body;
    await queryPostUpdateCategory(type, category_id);

    res.redirect("/categories");
  },
];

export async function postDeleteCategory(req, res) {
  const { id: category_id } = req.params;
  console.log(category_id);
  await queryDeleteCategory(category_id);
  res.redirect("/categories");
}
