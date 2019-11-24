const { Rating } = require('../models')

class RatingsController {
  async create(req, res) {
    try {
      const { idUser, idBank, rating } = req.body
      if (!idUser || !idBank || !rating) { throw new Error('Missing entry properties.') }
      const result = await Rating.create({
        idUser,
        idBank,
        rating,
      })
      if (result) { return res.status(200).json({ success: true }) }
      throw new Error('Error trying to create rating.')
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: true })
    }
  }
}

module.exports = new RatingsController()
