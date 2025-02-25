import express from "express"
import pool from "../db.js"
import { body, matchedData, validationResult } from "express-validator"

const router = express.Router()





router.post("/delete", async (req, res) => {
    const id = req.body.id

    await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])
    res.redirect("/")
})


router.get('/tweets/:id/delete', async (req, res) => {
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



// Router to create tweet page
router.get("/create", (req, res) => {
    res.render("create.njk", {
        title: "Kvitter",
    })
});

// Post the new tweet to the database with the message and author_id connected. 
router.post("/create", async (req, res) => {
    const { message, author_id } = req.body
    const [accounts] = await pool.promise().query(`SELECT id FROM user WHERE id = ?`, [author_id]);

    if (accounts.length === 0) {
        return res.render("failed.njk");
    }
    await pool.promise().query("INSERT INTO tweet (message, author_id) VALUES (?, ?)", [message, author_id]);
    res.redirect("/")
})









export default router