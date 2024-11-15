import pool from "./dbpool.js";

export const queryItems = async () => {
    const items = await pool.query('SELECT * FROM item INNER JOIN category ON item.type = category.id;')
    return items;
}

export const queryCategory = async () => {
    const categories = await pool.query('SELECT * FROM category')
    return categories;
}


