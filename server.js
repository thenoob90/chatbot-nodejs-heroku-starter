const express = require('express');

const app = express()

app.get('/', function (req, res) {
	res.send('chatbot-nodejs-heroku-starter!!');
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

