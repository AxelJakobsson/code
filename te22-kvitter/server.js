import 'dotenv/config'
import express from 'express'
import nunjucks from 'nunjucks'
import indexRouter from "./routes/index.js"
import tweetsRouter from "./routes/tweets.js"
import pool from './db.js'
import bodyParser from "body-parser"
import morgan from "morgan"

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


app.get('/tweet/:id/delete', async (req, res) => {
    const [tweetID] = await pool.promise().query(`SELECT id FROM tweet WHERE id = ?`, [req.params.id]);
    if(tweetID.length === 0) { // Make sure the tweet id is valid
        return res.render("failed.njk")
    }

    const [tweetsOut] = await pool.promise().query(`DELETE FROM tweet WHERE id = ?;`,
    [req.params.id],
    )
    res.render("tweets_delete.njk", {
        tweetsOut:tweetsOut,
    })
});


app.get("/tweets", async (req, res) => {
    const [tweets] = await pool.promise().query(`SELECT tweet.*, user.name 
        FROM tweet 
        JOIN user ON tweet.author_id = user.id;`)
    res.render("index.njk", {
        title: "Kvitter", 
        message: "Bästa hemsidan",
        tweets: tweets,
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})