const jwt = require('jsonwebtoken')
const { promisify } = require('util')

class JwtMiddleware {
  auth(req, res, next) {
    return async (req, res, next) => {
      if (res.headersSent) return next()
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' })
      }
      const [, token] = authHeader.split(' ')
      try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
        req.userId = decoded.id
        return next()
      } catch (err) {
        return res.status(401).json({ message: 'Token invalid' })
      }
    }
  }
}

const jwtMiddleware = new JwtMiddleware()
const auth = jwtMiddleware.auth()

module.exports = { auth }
