import express from 'express';
import pool from '../database/pool.js';

const router = express.Router();

// POST /messages
// Creates a new message in a channel, but only if the user is a subscriber.
router.post('/', async (req, res) => {
    const { content, user_id, channel_ids } = req.body; // channel_ids is now an array

    // Basic validation
    if (!Array.isArray(channel_ids) || channel_ids.length === 0) {
        return res.status(400).json({ error: 'channel_ids must be a non-empty array.' });
    }

    try {
        // Step 1: Check if the user is a subscriber to ALL the channels
        const subscriptionCheck = await pool.query(
            'SELECT COUNT(*) FROM subscriptions WHERE user_id = $1 AND channel_id = ANY($2)',
            [user_id, channel_ids]
        );
        
        // If the number of subscriptions doesn't match the number of channel_ids, the user is not subscribed to all channels.
        if (subscriptionCheck.rows[0].count != channel_ids.length) {
            return res.status(403).json({ error: 'User is not a member of one or more of the specified channels.' });
        }

        // Step 2: Create the message
        const messageResult = await pool.query(
            'INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING id',
            [content, user_id]
        );
        const message_id = messageResult.rows[0].id;

        // Step 3: Insert rows into the junction table for each channel
        const messageChannelsQuery = 'INSERT INTO message_channels (message_id, channel_id) VALUES ' +
            channel_ids.map((_, index) => `($1, $${index + 2})`).join(', ');

        const queryParams = [message_id, ...channel_ids];
        await pool.query(messageChannelsQuery, queryParams);

        res.status(201).json({ message_id, content, user_id, channel_ids });
    } catch (err) { 
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Ett okänt fel uppstod.' });
        }
    } 
});

export default router;
