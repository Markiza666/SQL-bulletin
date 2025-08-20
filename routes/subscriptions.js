// Connects a user to a channel.

app.post('/subscriptions', async (req, res) => {
    const { user_id, channel_id } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO subscriptions (user_id, channel_id) VALUES ($1, $2) RETURNING *',
        [user_id, channel_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});