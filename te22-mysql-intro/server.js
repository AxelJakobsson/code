import 'dotenv/config'
import express from 'express'
import nunjucks from 'nunjucks'
import pool from './db.js'

const app = express()
const port = 3000

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(express.static('./'))

app.get('/', (req, res) => {
    res.render('index.html', {
        title: 'Test'

    })
});

// app.get('/birds', async (req, res) => {
//         // const [birds] = await pool.promise().query('SELECT * FROM birds')
//         const [birds] = await pool.promise().query(
//             "SELECT birds.*, species.name AS species FROM birds JOIN species on birds.species_id = species.id;"
//         )
      
//         res.json(birds)
// })

app.get('/birds1/:id', async (req, res) => {
    const [bird] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN 
        species ON birds.species_id = species.id WHERE birds.id = ?;`,
    [req.params.id],
    )

    res.json(bird[0])
})

app.get('/birds', async (req, res) => {
    const [birds] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN species on birds.species_id = species.id;`)
    res.render("birds.njk", {
        birds: birds
    })
    console.log(birds)
});

app.get('/birds/:id', async (req, res) => {
    const [birds] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN 
        species ON birds.species_id = species.id WHERE birds.id = ?;`,
    [req.params.id],
    )
    res.render("birds2.njk", {
        birds: birds
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

export default app