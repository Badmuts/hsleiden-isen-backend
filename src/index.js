const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => res.send('Hello Universe!'))

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))