const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db('login')
    .where({ email })
    .first()
    .then((data) => {
      if (!data) {
        return res.status(400).json('wrong credentials');
      }

      const isValid = bcrypt.compareSync(password, data.hash);
      if (isValid) {
        return db('users')
          .where({ email })
          .first()
          .then((user) => {
            if (!user) {
              return res.status(400).json('unable to get user');
            }
            res.json(user);
          });
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json('wrong credentials');
    });
};

module.exports = {
  handleSignin,
};
