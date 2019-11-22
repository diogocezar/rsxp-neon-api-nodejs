const express = require('express')

const routes = express.Router()

const { UserController, UserValidator } = require('../controllers/UserController')
const PaymentLinksController = require('../controllers/PaymentLinksController')
const SessionController = require('../controllers/SessionController')
const { auth } = require('../middlewares/JwtMiddleware')

class Routes {
  constructor() {
    this.router = routes
    this.setRoutes()
  }

  setRoutes() {
    this.router.get('/banks', UserController.show)
    this.router.post('/banks/:id', UserController.store)
  }

  getRouter() {
    return this.router
  }
}

module.exports = new Routes().getRouter()
