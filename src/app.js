require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

class App {
  constructor() {
    this.app = express()
    this.routes()
  }

  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
