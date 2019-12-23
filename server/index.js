const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const cors = require('cors')
const history = require('connect-history-api-fallback')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(history())
app.use(express.static('dist'))
app.use(express.static('public'))

app.use((req, res, next) => {
  consola.info(req.url)
  next()
})

async function start() {
  const port = 12351
  app.listen(port, () => { consola.info(`Server listening on port ${port}`) })
}

start()