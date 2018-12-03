console.log('Iniciando servidor back')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// configuració db
const mongo_conn = require('./mongoDBController')


// conexión db
var db = mongo_conn.connect();


// schema usuario
var User = require('../models/user')


// servicio get user

app.get('/user', (req,res) => {
  User.find({}, 'name job', function (error, users) {
	  if (error) { console.error(error); }
	  res.send({
			users: users
		})
	}).sort({_id:-1}) 
})

// Crear usuario 
app.post('/add_user', (req,res) => {
  var db = req.db
  var name = req.body.name
  var job = req.body.job

  var new_user = new User (
    {
      name: name,
      job: job
    }
  )

  new_user.save( (error) => {
    if (error){
      console.log(error)
    } else {
      console.log('Usuario insertado exitosamente')
    }
    res.send({
      success: true,
      message: "Usuario dado de alta exitosamente"
    })
  })
})

app.listen(8089)
