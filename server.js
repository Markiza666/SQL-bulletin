import express from "express";
import { Pool } from "pg";
const app = express();
const port = 3000;

app.use(express.json());