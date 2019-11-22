const { PaymentLinks } = require('../models')

class PaymentLinksController {
  async show(req, res) {
    const paymentLinks = await PaymentLinks.findAll()
    return res.json(paymentLinks)
  }
}

module.exports = new PaymentLinksController()
