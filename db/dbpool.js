import pkg from "pg";

const { Pool } = pkg;

const currentConnectionString = process.env.STAGE === 'development' 
    ? `postgresql://${process.env.USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/kino_leather`
    : `postgresql://postgres.hlvbjqdwrqfcdzbksmdg:${process.env.KINO_LEATHER_SUPABASE_PASSWORD}@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`

const pool = new Pool({
    connectionString: currentConnectionString
})

export default pool;
