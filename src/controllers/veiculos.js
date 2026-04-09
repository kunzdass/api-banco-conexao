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

async function updateVeiculo (req, res) {
  try {
    if (!req.body.placa && !req.body.cor && !req.body.modelo) {
      return res.status(400).json({
        status: 'error',
        message: 'Informe ao menos um campo para atualizar: placa, cor ou modelo'
      })
    }
    const params = {
      ...req.body,
      id: req.params.id
    }
    const veiculo = await service.updateVeiculo(params)
    if (!veiculo.length) {
      return res.status(404).json({
        status: 'error',
        message: `Não foi encontrado um veículo com o id ${params.id}`
      })
    }
    return res.status(200).json({
      status: 'ok',
      message: 'Veículo atualizado com sucesso',
      data: veiculo
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

async function deleteVeiculo (req, res) {
  try {
    const veiculo = await service.deleteVeiculo(req.params)
    if (veiculo == 0) {
      return res.status(404).json({
        status: 'error',
        message: `Não foi encontrado um veículo com o id ${req.params.id}`
      })
    }
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

module.exports = {
  getVeiculos,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo
}