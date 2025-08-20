// Create a message (with validation!)
app.post('/messages', async (req, res) => {
    const { content, user_id, channel_id } = req.body;
    try {
        // Check if the user is subscribed to the channel
        const subscriptionCheck = await pool.query(
        'SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2',
        [user_id, channel_id]
        );

        if (subscriptionCheck.rows.length === 0) {  // If no subscription found
        return res.status(403).json({ error: 'Användaren är inte prenumerant på kanalen.' });
        }

        // Create the message if the user is subscribed
        const result = await pool.query(
        'INSERT INTO messages (content, user_id, channel_id) VALUES ($1, $2, $3) RETURNING *',
        [content, user_id, channel_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
