import express from 'express';
import pool from '../database/pool.js';

const router = express.Router();

// POST /subscriptions
// Creates a new subscription linking a user to a channel.
router.post('/', async (req, res) => {
    const { user_id, channel_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO subscriptions (user_id, channel_id) VALUES ($1, $2) RETURNING *',
            [user_id, channel_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'User is already subscribed to this channel.' });
        }
        res.status(500).json({ error: err.message });
    }
});

export default router;
