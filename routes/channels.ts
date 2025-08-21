import express from 'express';
import pool from '../database/pool.js';

const router = express.Router();

// POST /channels
// Creates a new channel with a name and owner (owner_id).
router.post('/', async (req, res) => {
    const { name, owner_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO channels (name, owner_id) VALUES ($1, $2) RETURNING *',
            [name, owner_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
    if (err instanceof Error) {
        // If the error is an instance of Error,
        // we can safely access its .message property
        res.status(500).json({ error: err.message });
    } else {
        // Otherwise, handle it as an unknown error
        res.status(500).json({ error: 'An unknown error occurred.' });
    }
}
});

// GET /channels/:id/messages
// Fetches all messages from a specific channel via the new junction table.
router.get('/:id/messages', async (req, res) => {
    const channelId = req.params.id;
    try {
        const result = await pool.query(
            `SELECT m.*, u.username
            FROM messages m
            JOIN users u ON m.user_id = u.id
            JOIN message_channels mc ON m.id = mc.message_id
            WHERE mc.channel_id = $1
            ORDER BY m.created_at`,
            [channelId]
        );
        res.status(200).json(result.rows);
    } catch (err) {
    if (err instanceof Error) {
        // If the error is an instance of Error,
        // we can safely access its .message property
        res.status(500).json({ error: err.message });
    } else {
        // Otherwise, handle it as an unknown error
        res.status(500).json({ error: 'An unknown error occurred.' });
    }
}
});


export default router;
