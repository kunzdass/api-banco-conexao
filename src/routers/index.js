const exampleRoute = require('./example');
const veiculosRoute = require('./veiculos');
const authRoute = require('./auth')

module.exports = (app) => {
  exampleRoute(app);
  veiculosRoute(app);
  authRoute(app);
}