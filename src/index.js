require('dotenv').config()
const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: 'db',
  dialect: 'mysql'
});

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/healthz', (req, res) => {
	sequelize.authenticate()
	    .then(() => res.json({healthy: true, error: null}))
	    .catch(err => res.json({healthy: false, error: err}))
})

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))