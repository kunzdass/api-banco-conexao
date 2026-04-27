const controller = require('../controllers/auth')

module.exports = (app) => {
  app.post('/auth/register', controller.register)
  app.post('/auth/login', controller.login)
  app.post('/auth/recovery', (req, res) => res.status(200).send())
}