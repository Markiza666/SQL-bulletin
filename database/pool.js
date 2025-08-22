import { Pool } from "pg";

const pool = new Pool({
    user: 'ditt_användarnamn',
    host: 'localhost',
    database: 'ditt_databasnamn',
    password: 'ditt_lösenord',
    port: 5432, 
});

export default pool;
