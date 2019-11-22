const { check } = require('express-validator/check')
const { User } = require('../models')
const ValidationHelper = require('../helpers/ValidationHelper')
const ResponseHelper = require('../helpers/ResponseHelper')

class UserValidator {
  validateStore() {
    return [
      check('name', 'Name does not exists').exists(),
      check('name', 'Name need to be string').isString(),
      check('name', 'Name string lenght need to be between 5 and 100').isLength({
        min: 5,
        max: 100,
      }),
      check('email', 'Email does not exists').exists(),
      check('email', 'Email needs to be an email').isEmail(),
      check('email', 'Email need to be string').isString(),
      check('email', 'Email string lenght need to be between 15 and 100').isLength({
        min: 15,
        max: 100,
      }),
      check('password', 'Password does not exists').exists(),
      check('password', 'Password need to be string').isString(),
      check('password', 'Password string lenght need to be between 5 and 100').isLength({
        min: 5,
        max: 100,
      }),
    ]
  }
}

class UserController {
  async store(req, res, next) {
    try {
      if ((await ValidationHelper.checkValidation(req, res)) === true) {
        const user = await User.create(req.body)
        res.json(ResponseHelper.get(true, 'User stored.', res, user))
      }
    } catch (err) {
      res.json(ResponseHelper.get(true, 'Error User stored.', res, err))
    }
    next()
  }

  async show(req, res, next) {
    const user = await User.findAll({ where: { id: req.params.id } })
    const response = user.length
      ? ResponseHelper.get(true, 'User returned.', res, user)
      : ResponseHelper.get(false, 'User not found.', res, user)
    res.json(response)
    return next()
  }
}

module.exports.UserController = new UserController()
module.exports.UserValidator = new UserValidator()
