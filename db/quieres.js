import pool from "./dbpool.js";

const getMessage = async () => {
    const message = await pool.query('SELECT * FROM hello')
    return message;
}

export {
    getMessage
}

