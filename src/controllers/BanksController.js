const { Bank } = require('../models')

class BanksController {
  async rating(req, res) {
    try {
      const { id } = req.params
      const { rating } = req.body
      if (!id || !rating) throw new Error('Id or Rating is missing.')
      const result = await Bank.update({ rating }, { where: { id } })
      if (result) { return res.status(200).json({ success: true }) }
      throw new Error('Error trying to update rating.')
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: true })
    }
  }

  async show(req, res) {
    try {
      const banks = await Bank.findAll()
      return res.status(200).json(banks)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: true })
    }
  }
}

module.exports = new BanksController()
