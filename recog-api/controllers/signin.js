const handleSignin = (req, res, db, bcrypt) => {
  const {email, password} = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json(`Something is wrong. Check what you've entered so far`)
  }
  db
    .select('email', 'hash')
    .from('login')
    .where({email: email})
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where({email: email})
          .then(data => {
            res.status(200).json(data[0])
          })
          .catch(err => {
            if (err) {
              throw new Error()
            }
          })
      } else {
        throw new Error()
      }
    })
    .catch(err => {
      if (err) {
        res.status(400).json('Could not sign you in. Check your credentials?')
      }
    })
}

module.exports = {
  handleSignin
}
