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

async function updateVeiculo (params) {
  const campos = []
  const binds = []
  let bindIndex = 1;

  if (Object.hasOwn(params, 'placa')) {
    campos.push(` placa = $${bindIndex++} `)
    binds.push(params.placa)
  }

  if (Object.hasOwn(params, 'cor')) {
    campos.push(` cor = $${bindIndex++} `)
    binds.push(params.cor)
  }

  if (Object.hasOwn(params, 'modelo')) {
    campos.push(` modelo = $${bindIndex++} `)
    binds.push(params.modelo)
  }

  binds.push(params.id)
  const sql = `
    update veiculos
       set ${campos.join(',')}
     where id = $${bindIndex++}
     returning *
  `

  const resposta = await db.query(sql, binds)
  return resposta.rows
}

module.exports = {
  getVeiculos,
  createVeiculo,
  updateVeiculo
}