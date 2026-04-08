const controller = require('../controllers/veiculos')

module.exports = (app) => {
  app.get('/veiculos', controller.getVeiculos);
  app.post('/veiculos', controller.createVeiculo);
}