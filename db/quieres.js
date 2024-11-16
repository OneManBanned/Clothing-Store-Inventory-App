import pool from "./dbpool.js";

export const queryItems = async () => {
    const items = await pool.query('SELECT * FROM item INNER JOIN category ON item.type = category.id;')
    return items;
}

export const queryCategory = async () => {
    const categories = await pool.query('SELECT * FROM category')
    return categories;
}

export const queryCreateItem = async(name, color, size, price, category) => {
    await pool.query('INSERT INTO item (name, color, size, price, type) VALUES ($1, $2, $3, $4, $5)', [name, color, size, price, category])
}
