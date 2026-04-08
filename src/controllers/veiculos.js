const service = require('../services/veiculos')

async function getVeiculos (req, res) {
  const veiculos = await service.getVeiculos()
  return res.status(200).json({
    status: 'ok',
    data: veiculos
  })
}

async function createVeiculo (req, res) {
  try {
    if (!req.body.placa || !req.body.cor) {
      return res.status(400).json({
        status: 'error',
        message: 'Campos obrigatórios faltando: placa, cor'
      })
    }
    const veiculo = await service.createVeiculo(req.body)
    return res.status(201).json({
      status: 'ok',
      message: 'Veículo cadastrado com sucesso',
      data: veiculo
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

module.exports = {
  getVeiculos,
  createVeiculo
}