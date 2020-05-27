const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '2069be1b8e36462fa5b33fa573604448'
});

const handleApiCall = (req, res) => {
	app.models
	  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	  .then(data => {
	  	res.json()
	  })
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}