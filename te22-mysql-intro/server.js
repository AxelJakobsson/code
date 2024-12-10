import 'dotenv/config'
import express from 'express'
import nunjucks from 'nunjucks'
import pool from './db.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static('./'));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html', {
        title: 'Test'
    })
});

app.get('/birds1/:id', async (req, res) => {
    const [bird] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN 
        species ON birds.species_id = species.id WHERE birds.id = ?;`,
    [req.params.id],
    )

    res.json(bird[0])
});

app.get('/birds', async (req, res) => {
    const [birds] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN species on birds.species_id = species.id;`)
    res.render("birds.njk", {
        birds: birds
    })
    console.log(birds)
});

app.get('/birds/new', async (req, res) => {
    const [birds] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN species on birds.species_id = species.id;`)
    res.render("birds_form.njk", {
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
});

app.get('/birds/:id/delete', async (req, res) => {
    const [birdsOut] = await pool.promise().query(`SELECT birds.*, species.name AS species FROM birds JOIN species on birds.species_id = species.id;`)
    const [birds] = await pool.promise().query(`DELETE FROM birds WHERE id = ?`,
    [req.params.id],
    )
    res.render("birds_delete.njk", {
        // birds:birds,
        birdsOut:birdsOut
    })
});


app.post('/birds', async (req, res) => {
    console.log(req.body)
    const { name, wingspan, species_id } = req.body
  
    const [result] = await pool.promise().query('INSERT INTO birds (name, wingspan, species_id) VALUES (?, ?, ?)', [name, wingspan, species_id])
  
    res.json(result)
});

app.post('/birds/:id', async (req, res) => {
    const [result] = await pool.promise().query(`DELETE FROM birds WHERE birds.id = ?;`,
    [req.params.id],
    )
    res.json(result)
});







// app.get('/form', (req, res) => {
//     res.render('species_form.njk', {
//         title: 'Test'
//     })
// });



// app.get('/species', async (req, res) => {
//     const [species] = await pool.promise().query('SELECT * FROM species')

//     res.render('species.njk', { species })
// })

// app.post('/species', async (req, res) => {
//     const {name, latin, wingspan_min, wingspan_max} = req.body
    
//     const [result] = await pool.promise().query('INSERT INTO species (name, latin, wingspan_min, wingspan_max) VALUES (?, ?, ?, ?)', [name, latin, wingspan_min, wingspan_max])

//     res.json(result)

//     res.redirect('/species')
// });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

export default app