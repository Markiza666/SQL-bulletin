import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'sql-bulletin',
    password: 'gurkan234',
    port: 5432, 
});

export default pool;
