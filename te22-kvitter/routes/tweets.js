import express from "express"
import pool from "../db.js"

const router = express.Router()

// router.get("tweets/:id/delete", async (req, res) => {
//     const id = req.params.id

//     await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])

//     res.redirect("/")
// })


router.post("/delete", async (req, res) => {
    const id = req.body.id

    await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])
    res.redirect("/")
})



export default router