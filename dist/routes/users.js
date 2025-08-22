import express from 'express';
import pool from '../database/pool.js';
const router = express.Router();
// POST /users
// Creates a new user with a username and email.
router.post('/', async (req, res) => {
    // TypeScript vet nu att req.body ska matcha User-gränssnittet.
    const { username, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET /users/:id/channels
// Fetches all channels a specific user is subscribed to.
router.get('/:id/channels', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query('SELECT c.id, c.name FROM channels c JOIN subscriptions s ON c.id = s.channel_id WHERE s.user_id = $1', [userId]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
