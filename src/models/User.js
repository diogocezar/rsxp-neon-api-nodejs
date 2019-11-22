const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *    required:
 *      - name
 *      - email
 *      - password
 */
class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    const User = sequelize.define(
      'user',
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      {
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8)
            }
          },
        },
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      },
    )
    User.prototype.checkPassword = function (password) {
      return bcrypt.compare(password, this.password_hash)
    }
    User.prototype.generateToken = function () {
      return jwt.sign({ id: this.id }, process.env.APP_SECRET)
    }
    return User
  }
}

module.exports = User
