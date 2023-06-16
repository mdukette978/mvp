const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const dbString = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const client = new Pool ({
    connectionString: dbString
});

app.use(cors());
app.use(express.static('public'));

app.get('/trails', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM trails');
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    }
});

app.get("/trails/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const results = await client.query('SELECT * FROM trails WHERE trail_id = $1', [id]);
        if (!results.rows) {
            res.status(404).send('No trail data found');
        }
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    }
});

app.post("/trails", async (req, res) => {
    const trailbody = req.body;
    try {
        const { trail_name, location, difficulty, distance, description, rating } = trailbody;
        const results = await client.query('INSERT INTO trails(trail_name, location, difficulty, distance, description, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [trail_name, location, difficulty, distance, description, rating]);
        res.status(201).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting trail into database');
    }
});

app.put("/trails/:id", async (req, res) => { 
    const id = req.params.id;
    const { trail_name, location, difficulty, distance, description, rating } = req.body;
    try {
        const results = await client.query(`UPDATE trails SET trail_name = $1, location = $2, difficulty = $3, distance = $4, description = $5, rating = $6 WHERE trail_id = $7 RETURNING *`, [trail_name, location, difficulty, distance, description, rating, id]);
        if (results.rowCount === 0) {
            res.status(404).send('Trail not found');
        }
        res.status(200).json(results.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    } 
  });

  app.delete("/trails/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const results = await client.query('DELETE FROM trails WHERE trail_id = ($1) RETURNING *', [id]);
        if (!results.rows) {
            res.status(404).send('No trail data found');
        }
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    }
  });


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});