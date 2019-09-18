const express = require('express')
const app = express()
const { Client } = require('pg')
var bodyParser = require('body-parser')


const port = 3000
const params = {
  port: 5432,
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "w5d3"
}
const postgres = new Client(params)
postgres.connect()
const selectMusicians = "SELECT musicians.*, instruments.name AS instrument_name, instruments.brand AS instrument_brand FROM musicians JOIN instruments ON musicians.instrument_id = instruments.id"

app.use(express.static('public'))
app.use(bodyParser())
app.set('view engine', 'ejs')

app.get( '/', (req,res) => {
  console.log("Route was hit")
  postgres.query("SELECT * FROM instruments").then(data => {
    const templateVars = {instruments: data.rows}
    res.render('index', templateVars)
  })
})

app.get('/musicians', (req, res) => {
  console.log("Route was hit")
  postgres.query(selectMusicians)
  .then(data => {
    console.log("Promise is finished, received data")
    const templateVars = { musicians: data.rows }
    res.render('content', templateVars)
  })
  .catch(err => console.log(err))
})

app.get('/api/musicians', (req, res) => {
  console.log("Route was hit")
  postgres.query(selectMusicians)
  .then(data => {
    console.log("Promise is finished, received data")
    const arrayOfMusicians = data.rows
    res.json(arrayOfMusicians)
  })
  .catch(err => console.log(err))
})

app.get('/api/musicians/:id', (req, res) => {
  const {id} = req.params
  const selectAMusician = `SELECT musicians.*, instruments.name AS instrument_name, instruments.brand AS instrument_brand FROM musicians JOIN instruments ON musicians.instrument_id = instruments.id WHERE musicians.id = ${id}`
  console.log("Route was hit")
  postgres.query(selectAMusician)
    .then(data => {
      console.log("Promise is finished, received data")
      const arrayOfMusicians = data.rows
      res.json(arrayOfMusicians)
    })
    .catch(err => console.log(err))
})

app.post('/musicians', (req,res) => {
  console.log(req.body)
  const insertVariables = [
    req.body.name,
    req.body.stage_name,
    parseInt(req.body.instrument)
  ]
  postgres.query("INSERT INTO musicians (name, stage_name, instrument_id) VALUES ($1,$2,$3)", insertVariables)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .finally(() => res.redirect('/musicians'))
})

app.listen(port, () => console.log(`Express server running on port ${port}`));
