// Channel name and owner ID.
app.post('/channels', async (req, res) => {
    const { name, owner_id } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO channels (name, owner_id) VALUES ($1, $2) RETURNING *',
        [name, owner_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});