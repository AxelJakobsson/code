import 'dotenv/config'
import express from 'express'
import pool from './db.js'

const app = express()
const port = 3000

app.get('/', async (req, res) => {
        const [birds] = await pool.promise().query('SELECT * FROM birds')
      
        res.json(birds)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})