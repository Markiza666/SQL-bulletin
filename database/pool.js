import pg from "pg";

const { Pool } = pg;  // Destructure the Pool class from the pg module

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'sql-bulletin',
    password: 'gurkan234',
    port: 5432, 
});

export default pool;
