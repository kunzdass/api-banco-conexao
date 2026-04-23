const db = require('../configs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register (params) {
  const { login, senha, nome } = params
  const sql = `
    insert into usuarios (
      login,
      senha,
      nome
    ) values (
      $1,
      $2,
      $3
    ) returning id, login, nome
  `
  const senhaHash = await bcrypt.hash(senha, 10)
  const result = await db.query(sql, [login, senhaHash, nome])
  return result.rows
}

async function getUserByLogin (params) {
  const { login } = params
  const sql = 'select id, login, nome, senha from usuarios where login = $1'
  const result = await db.query(sql, [login])
  return result.rows
}

async function login (params) {
  const { login, senha } = params

  const userExists = await getUserByLogin({ login })
  if (!userExists.length) {
    throw new Error('Usuário não encontrado')
  }

  const user = userExists[0]

  const senhaCorreta = await bcrypt.compare(senha, user.senha)
  if (!senhaCorreta) {
    throw new Error('Senha incorreta')
  }

  delete user.senha

  const token = jwt.sign({ user }, process.env.AUTH_KEY, {
    algorithm: 'HS256', expiresIn: '8h'
  })

  return {
    user,
    token
  }
}

module.exports = {
  register,
  getUserByLogin,
  login
}

