import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: `postgresql://${process.env.USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/kino_leather`
})
 
export default pool;
