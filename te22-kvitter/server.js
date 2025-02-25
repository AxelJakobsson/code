import 'dotenv/config'
import express from 'express'
import nunjucks from 'nunjucks'
import indexRouter from "./routes/index.js"
import tweetsRouter from "./routes/tweets.js"
import pool from './db.js'
import bodyParser from "body-parser"
import morgan from "morgan"
import { body, matchedData, validationResult } from "express-validator"


const app = express()
const port = 3000

nunjucks.configure("views", {
    autoescape: true,
    express: app,
})
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded( { extended: true}))

app.use("/", indexRouter)
app.use("/tweets", tweetsRouter)


app.get('/tweets/:id/edit', async (req, res) => {
    const id = req.params.id;
    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }
    const [rows] = await pool.promise().query('SELECT * FROM tweet WHERE id = ?', [id])
    if (rows.length === 0) {
        return res.status(404).send("Tweet not found")
    }
    res.render('edit.njk', { tweet:  rows[0] })
})


app.post("/tweets/edit",
    body("id").isInt(),
    
    body("message").isLength({ min: 1, max:130 }),
    async (req, res) => {
    const errors = validationResult(req)

    const { id, message } = matchedData(req)
    console.log(message)

    if (!errors.isEmpty()) {
        return res.status(400).send("Invalid input")
    }
    await pool.promise().query("UPDATE tweet SET message = ? WHERE id = ?", [message, id])
    res.redirect("/")
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})