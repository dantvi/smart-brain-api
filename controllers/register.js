const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .then(() => {
        return trx('users')
          .insert({
            name: name,
            email: email,
            joined: new Date(),
          })
          .then(() => {
            return trx('users')
              .where({ email: email })
              .first()
              .then((user) => {
                res.json(user);
              });
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.error(err);
    res.status(400).json('unable to register');
  });
};

module.exports = {
  handleRegister,
};
