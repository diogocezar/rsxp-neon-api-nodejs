const express = require('express')

const routes = express.Router()

const BanksController = require('../controllers/BanksController')
const RatingsController = require('../controllers/RatingsController')

class Routes {
  constructor() {
    this.router = routes
    this.setRoutes()
  }

  setRoutes() {
    this.router.get('/banks', BanksController.show)
    this.router.post('/ratings', BanksController.rating)
  }

  getRouter() {
    return this.router
  }
}

module.exports = new Routes().getRouter()
