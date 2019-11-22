require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const { logMiddlewareStart, logMiddlewareEnd } = require('./middlewares/LogMiddleware')
const IdHashMiddleware = require('./middlewares/IdHashMiddleware')
const SwaggerHelper = require('./helpers/SwaggerHelper')

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.swagger()
    this.routes()
    this.finish()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(logMiddlewareStart)
    this.app.use(IdHashMiddleware)
  }

  swagger() {
    SwaggerHelper.use(this.app)
  }

  routes() {
    this.app.use(routes)
  }

  finish() {
    this.app.use(logMiddlewareEnd)
  }
}

module.exports = new App().app
