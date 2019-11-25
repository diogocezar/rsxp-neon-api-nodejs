const { Bank, Rating } = require('../models')

class BanksController {
  async show(req, res) {
    return res.status(200).json()
  }
}

module.exports = new BanksController()
