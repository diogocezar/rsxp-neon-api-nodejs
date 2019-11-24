const { Bank, Rating } = require('../models')

class BanksController {
  async show(req, res) {
    try {
      const banks = await Bank.findAll()
      const promises = banks.map(async item => ({
        name: item.name,
        icon: item.icon,
        code: item.code,
        rating: await BanksController.extractRating(item.id),
      }
      ))
      const jsonReturn = await Promise.all(promises)
      return res.status(200).json(jsonReturn)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: true })
    }
  }

  static async extractRating(idBank) {
    const databaseRating = await Rating.findAll({ where: { idBank } })
    if (!databaseRating.length) return 0
    const { rating: sumRatings } = databaseRating.reduce((oldValue, newValue) => ({ rating: oldValue.rating + newValue.rating }))
    const avgRatings = Math.round(sumRatings / databaseRating.length)
    return avgRatings
  }
}

module.exports = new BanksController()
