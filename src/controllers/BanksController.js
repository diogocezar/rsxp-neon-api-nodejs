const { Bank, Rating } = require('../models')

class BanksController {
  async show(req, res) {
    try {
      const banks = await Bank.findAll()
      return res.status(200).json(banks)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: true })
    }
  }

  async extractRating(idBank) {
    const databaseRating = Rating.findAll({ where: { idBank } })
    const rating = rating.reduce((item => ))
  }
}

module.exports = new BanksController()
