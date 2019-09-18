const { Client } = require('pg')

const params = {
  port: 5432,
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "w5d3"
}

const postgres = new Client(params)

postgres.connect()

// postgres.query("SELECT * FROM musicians").then(res => console.log(res.rows))

const showDataInAPrettyWay = data => {
  for(const musician of data){
    const {name, stage_name, instrument_id, instrument_name, instrument_brand} = musician
    console.log(`We have ${name} also known as ${stage_name} who plays ${instrument_name} made by ${instrument_brand}.`)
  }
}
// postgres.query("SELECT * FROM musicians").then(res => showDataInAPrettyWay(res.rows))

postgres.query("SELECT musicians.*, instruments.name AS instrument_name, instruments.brand AS instrument_brand FROM musicians JOIN instruments ON musicians.instrument_id = instruments.id").then(res => showDataInAPrettyWay(res.rows))


const resultArray = []
for(let i = 0; i< 50; i++){
  const randomObject = {
    instrument_id: Math.floor(Math.random() * 100)
  }
  resultArray.push()
}