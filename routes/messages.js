import express from 'express';
import pool from '../database/pool.js';

const router = express.Router();

// POST /messages
// Creates a new message in a channel, but only if the user is a subscriber.
router.post('/', async (req, res) => {
    const { content, user_id, channel_id } = req.body;
    try {
        // Check if the user is subscriber
        const subscriptionCheck = await pool.query(
            'SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2',
            [user_id, channel_id]
        );

        if (subscriptionCheck.rows.length === 0) {
            return res.status(403).json({ error: 'Användaren är inte prenumerant på kanalen.' });
        }

        // If subscribed, create the message
        const result = await pool.query(
            'INSERT INTO messages (content, user_id, channel_id) VALUES ($1, $2, $3) RETURNING *',
            [content, user_id, channel_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
