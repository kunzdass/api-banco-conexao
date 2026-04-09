const controller = require('../controllers/veiculos')

module.exports = (app) => {
  app.get('/veiculos', controller.getVeiculos);
  app.post('/veiculos', controller.createVeiculo);
  app.patch('/veiculos/:id', controller.updateVeiculo);
  app.delete('/veiculos/:id', controller.deleteVeiculo);
}