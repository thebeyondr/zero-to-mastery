const Clarifai = require('clarifai')

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'd72c09907eb344318b7393cfa1d0a827'
})

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => {
      if (err) {
        res.status(400).json('Cannot get data from API')
      }
    })
}

const handleImage = (req, res, db) => {
  const {id} = req.body
  return db('users')
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
}

module.exports = {
  handleImage,
  handleAPICall
}
