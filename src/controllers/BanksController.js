const { Bank } = require('../models')

class BanksController {
  async rating(req, res, next) {
    const { id } = req.params
    const { rating } = req.body
    const bank = await Bank.update({ rating }, { where: { id } })
    return bank
  }

  async show(req, res, next) {
    const banks = await Bank.findAll()
    res.status(200).json(banks)
  }
}

module.exports = new BanksController()
