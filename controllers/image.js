require('dotenv').config();

const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .predict('face-detection', req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .increment('entries', 1)
    .then(() => {
      return db('users')
        .where({ id })
        .first('entries')
        .then((user) => {
          res.json(user.entries);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json('unable to get entries');
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
