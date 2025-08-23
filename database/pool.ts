import 'dotenv/config';
import pg from "pg";

const { Pool } = pg;  // Destructure the Pool class from the pg module

// Ensure all required environment variables are set
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_DATABASE || !process.env.DB_PORT) {
    throw new Error('Environment variables for database connection are missing.');
}

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
});

// Test the database connection
pool.on('connect', () => {
    console.log('Ansluten till databasen');
});

pool.on('error', (err) => {
    console.error('Oväntat fel på databasanslutningen:', err);
    process.exit(-1);
});

export default pool;
