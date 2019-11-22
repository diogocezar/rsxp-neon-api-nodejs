const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const swaggerDefinition = require('../config/swagger')

class SwaggerHelper {
  constructor() {
    const routes = path.resolve(__dirname, '..', 'routes')
    const models = path.resolve(__dirname, '..', 'models')
    this.options = {
      swaggerDefinition,
      apis: [`${routes}/*.js`, `${models}/*.js`],
    }
    this.spec = swaggerJsDoc(this.options)
  }

  defineJson(app) {
    app.get('/swagger.json', (req, res, next) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(this.spec)
      next()
    })
  }

  defineDocs(app) {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(this.spec))
  }

  use(app) {
    this.defineJson(app)
    this.defineDocs(app)
  }
}

module.exports = new SwaggerHelper()
