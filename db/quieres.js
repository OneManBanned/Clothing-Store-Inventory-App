import pool from "./dbpool.js";

// item quieres

export const queryItems = async () => {
    const items = await pool.query('SELECT item_id, name, color, size, price, type FROM item INNER JOIN category ON type_id = category_id;')
    return items;
}

export const queryItem = async (id) => {
    const item = await pool.query('SELECT item_id, name, color, size, price, type FROM item INNER JOIN category ON type_id = category_id WHERE item_id = ($1)', [id])
    return item;
}

export const queryCreateItem = async(name, color, size, price, category) => {
    await pool.query('INSERT INTO item (name, color, size, price, type_id) VALUES ($1, $2, $3, $4, $5)', [name, color, size, price, category])
}

export const queryPostUpdateItem = async( item_id, name, color, size, price, cateogry ) => {
    await pool.query('UPDATE item SET name = ($2), color = ($3), size = ($4), price = ($5), type_id = ($6) WHERE item_id = ($1);', [ item_id, name, color, size, price, cateogry ])
}

export const queryDeleteItem = async(item_id) => {
    await pool.query('DELETE FROM item WHERE item_id = ($1)', [item_id])
}
//category quieres

export const queryCategories = async () => {
    const categories = await pool.query('SELECT * FROM category')
    return categories;
}

export const queryCreateCategory = async(type) => {
    await pool.query('INSERT INTO category (type) VALUES ($1)', [type])
}

export const queryCategory = async(id) => {
    const category = await pool.query('SELECT * FROM category WHERE category_id = ($1)', [id])
    return category
}

export const queryPostUpdateCategory = async(type, id) => {
    await pool.query('UPDATE category SET type = ($1) WHERE category_id = ($2)', [type, id])
}

export const queryDeleteCategory = async(id) => {
    await pool.query('DELETE FROM category WHERE category_id = ($1)', [id])
}
