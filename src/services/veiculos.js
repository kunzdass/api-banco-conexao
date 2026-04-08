const db = require('../configs')

async function getVeiculos () {
  const resposta = await db.query('select * from veiculos')
  return resposta.rows
}

async function createVeiculo (params) {
  const { placa, cor, modelo } = params
  const sql = `
    insert into veiculos (
      placa,
      cor,
      modelo
    ) values (
      $1,
      $2,
      $3
    ) returning id, placa, cor, modelo
  `
  const resposta = await db.query(sql, [placa, cor, modelo])
  return resposta.rows
}

module.exports = {
  getVeiculos,
  createVeiculo
}