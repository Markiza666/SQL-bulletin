import express from "express";
import { Pool } from "pg";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`API-servern körs på http://localhost:${port}`);
});

app.use(express.json());