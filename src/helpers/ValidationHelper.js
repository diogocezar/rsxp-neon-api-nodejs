const { validationResult } = require('express-validator/check')

class ValidationHelper {
  async checkValidation(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorsJson = { errors: errors.array() }
      res.rawJson = errorsJson
      return res.status(422).json(errorsJson)
    }
    return true
  }
}

module.exports = new ValidationHelper()
