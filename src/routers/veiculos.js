const controller = require('../controllers/veiculos');
const { verifyJWT } = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/veiculos', controller.getVeiculos);
  app.post('/veiculos', verifyJWT, controller.createVeiculo);
  app.patch('/veiculos/:id', verifyJWT, controller.updateVeiculo);
  app.delete('/veiculos/:id', verifyJWT, controller.deleteVeiculo);
}