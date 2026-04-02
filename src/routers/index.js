const exampleRoute = require('./example');
const veiculosRoute = require('./veiculos')

module.exports = (app) => {
  exampleRoute(app);
  veiculosRoute(app);
}