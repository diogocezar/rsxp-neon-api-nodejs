const { Rating } = require('../models')

class RatingsController {
  async create(req, res) {
    return res.status(200).json()
  }
}

module.exports = new RatingsController()
