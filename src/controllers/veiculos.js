const service = require('../services/veiculos')

async function getVeiculos (req, res) {
  const veiculos = await service.getVeiculos()
  return res.status(200).json(veiculos)
}

module.exports = {
  getVeiculos
}