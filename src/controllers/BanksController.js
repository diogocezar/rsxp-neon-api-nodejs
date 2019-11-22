const { Bank } = require('../models')

class BanksController {
  async rating(req, res) {
    const { id } = req.params
    const { rating } = req.body
    const bank = await Bank.update({ rating }, { where: { id } })
    return res.status(200).json
  }

  async rating(req, res) {
    const { id } = req.params
    const { rating } = req.body
    const bank = await Bank.update({ rating }, { where: { id } })
    return res.status(200).json
  }

  async show(req, res) {
    const banks = await Bank.findAll()
    res.status(200).json(banks)
  }
}

module.exports = new BanksController()
