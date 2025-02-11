import express, { application } from "express"
import pool from "../db.js"
import bodyParser from "body-parser"

const router = express.Router()

router.get("/", async (req, res) => {
    const [tweets] = await pool.promise().query(`SELECT tweet.*, user.name 
        FROM tweet 
        JOIN user ON tweet.author_id = user.id;`)
    res.render("index.njk", {
        title: "Kvitter", 
        message: "Bästa hemsidan",
        tweets: tweets,
    })
})

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

router.post("/createNoID", async (req, res) => {
    const { message } = req.body
    const author_id = 6
    await pool.promise().query("INSERT INTO tweet (message, author_id) VALUES (?, ?)", [message, author_id]);
    res.redirect("/")
})


// Router to the create account page
router.get("/create/account", async (req, res) => { 
    res.render("create_account.njk", {
        title: "Kvitter",
    })
});

// Post the new account into the database
router.post("/create/account", async (req, res) => {
    const { name } = req.body
    const [results] = await pool.promise().query("INSERT INTO user (name) VALUES (?)", [name])
    res.redirect("/")
})

router.get("/accounts", async (req, res) => {
    const [accounts] = await pool.promise().query(`SELECT user.*
        FROM user`)
    res.render("accounts.njk", {
        title: "Accounts", 
        accounts: accounts

    })
})

export default router