const handleRegister = (req, res, db, bcrypt) => {
  const {email, name, password} = req.body
  if (!email || !name || !password) {
    return res
      .status(400)
      .json(`Something is wrong. Check what you've entered so far`)
  } else {
    const hash = bcrypt.hashSync(password)
    db
      .transaction(trx => {
        trx
          .insert({
            email,
            hash
          })
          .into('login')
          .returning('email')
          .then(loginEmail => {
            return trx('users').returning('*').insert({
              name: name,
              email: loginEmail[0],
              joined: new Date()
            })
          })
          .then(user => {
            res.status(200).json(user[0])
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          res
            .status(400)
            .json(`We couldn't register this user. Try logging in?`)
        }
      })
  }
}

module.exports = {
  handleRegister
}
