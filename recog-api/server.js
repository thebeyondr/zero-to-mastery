const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'recog'
  }
})

// db.select('*').from('users').then(data => console.log('Data: ', data))

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
const database = {
  users: [
    {
      id: '1234',
      name: 'Escanor',
      email: 'lionspride@pts.com',
      password: 'nilr3M',
      entries: 0,
      joined: new Date()
    },
    {
      id: '4321',
      name: 'Liana',
      email: 'liana@pts.com',
      password: 'warrior10',
      entries: 0,
      joined: new Date()
    }
  ]
}
app.get('/', (req, res) => {
  res.status(200).json(database.users)
})

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.status(200).json(database.users[0])
  } else {
    res.status(400).json('You are not one of us!')
  }
})

app.post('/register', (req, res) => {
  const {email, name} = req.body
  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.status(200).json(user[0])
    })
    .catch(err => {
      if (err) {
        res.status(400).json(`We couldn't register this user. Try logging in?`)
      }
    })
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params
  db
    .select('*')
    .from('users')
    .where({id})
    .then(user => {
      if (user.length) {
        res.status(200).json(user[0])
      } else {
        throw new Error('Could not find that user')
      }
    })
    .catch(err => {
      res.status(404).json(err.message)
    })
})

app.put('/image', (req, res) => {
  const {id} = req.body
  db('users')
    .where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.status(200).json(entries[0])
    })
    .catch(err => {
      if (err) {
        res.status(400).json('Could not update your entries')
      }
    })
})

app.listen(3000, () => {
  console.log('Awaiting the apocalypse on port 3000...')
})
