console.log('Iniciando servidor back')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// servicio get user

app.get('/user', (req,res) => {
  res.send (
    {
      name: "Pablo",
      job: "Doctor"
    }
    
  )
})

app.listen(8089)