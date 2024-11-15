import { queryCategory } from "../db/quieres.js";

export async function getCategories(req, res) {
  const { rows: categories } = await queryCategory();
  res.render("categories", { categories: categories });
}
