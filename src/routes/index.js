const express = require('express')

const routes = express.Router()

const { UserController, UserValidator } = require('../controllers/UserController')
const PaymentLinksController = require('../controllers/PaymentLinksController')
const SessionController = require('../controllers/SessionController')
const { auth } = require('../middlewares/JwtMiddleware')

class Routes {
  constructor() {
    this.router = routes
    this.setRoutes()
  }

  // https://swagger.io/docs/specification/basic-structure/
  // https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#parameterObject

  setRoutes() {
    /**
     * @swagger
     * /user/{id}:
     *  get:
     *    summary: Get Users
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        description: Get user at database with this id
     *        schema:
     *          type: integer
     *          format: int64
     *          minimum: 1
     *    responses:
     *      '200':
     *        description: A user object.
     *        content:
     *        application/json:
     *        schema:
     *          type: object
     */
    this.router.get('/user/:id', UserController.show)
    /**
     * @swagger
     * /user:
     *  post:
     *    summary: Store a new User
     *    requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/User'
     *    parameters:
     *      - in: body
     *        name: user
     *        description: The user to create.
     *        schema:
     *          $ref: '#/definitions/User'
     *    responses:
     *      '201':
     *        description: User created.
     *        content:
     *        application/json:
     *        schema:
     *          type: object
     */
    this.router.post('/user', UserValidator.validateStore(), UserController.store)
    this.router.get('/paymentLinks', PaymentLinksController.show)
    this.router.post('/sessions', SessionController.store)
    this.router.get('/idhash', (req, res) => {
      res.status(200).send({ idClient: req.body.idClient })
    })
    this.router.use(auth)
    this.router.get('/dashboard', (req, res) => res.status(200).send())
  }

  getRouter() {
    return this.router
  }
}

module.exports = new Routes().getRouter()
