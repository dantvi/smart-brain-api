const handleProfileGet = (req, res, db) => {
  const { id } = req.params;

  db('users')
    .where({ id })
    .first()
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(400).json('not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json('error getting user');
    });
};

module.exports = {
  handleProfileGet,
};
