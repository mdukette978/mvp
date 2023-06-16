const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const dbString = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const client = new Pool ({
    connectionString: dbString
});

app.use(express.static('public'));

app.get('/trails', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM trails');
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});