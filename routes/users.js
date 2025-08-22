// This endpoint should accept a username and email address and store them in the users table.
app.post('/users', async (req, res) => {
    const { username, email } = req.body;   // Extract username and email from request body
    try {
        const result = await pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',  // $1 and $2 are placeholders for parameterized queries. Return the inserted row, including the generated ID.
        [username, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});