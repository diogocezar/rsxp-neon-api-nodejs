const aes = require('aes-cross')

class IdHashMiddleware {
  setHash(req, res, next) {
    return (req, res, next) => {
      const { idHash } = req.body
      if (idHash) {
        try {
          const key = Buffer.from(process.env.SECURITY_KEY.split(','))
          const iv = Buffer.from(process.env.SECURITY_IV.split(','))
          const newIdHash = idHash.replace('B4=RR4', '/').replace('M=41=5', '+')
          aes.setKeySize(256)
          const idClient = parseInt(aes.decText(newIdHash, key, iv, 'ascii'), 10)
          req.body.idClient = idClient
        } catch (err) {
          req.body.idClient = -1
        }
      }
      return next()
    }
  }
}

module.exports = new IdHashMiddleware().setHash()
