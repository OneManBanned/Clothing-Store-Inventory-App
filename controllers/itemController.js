import { queryItems } from "../db/quieres.js"

export async function getItems(req, res) {
    const { rows: items } = await queryItems()
    console.log(items)
    res.render("items", { items: items})
}
