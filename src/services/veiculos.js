const db = require('../configs')

async function getVeiculos () {
  const resposta = await db.query('select * from veiculos')
  return {
    veiculos: resposta.rows
  }
}

module.exports = {
  getVeiculos
}