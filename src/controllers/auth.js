const service = require('../services/auth')

async function register (req, res) {
  try {
    if (!req.body.login || !req.body.senha || !req.body.senha_confirm) {
      return res.status(400).json({
        status: 'error',
        message: 'Campos obrigatórios faltando: login, senha, senha_confirm'
      })
    }

    const userExists = await service.getUserByLogin(req.body)
    if (userExists.length) {
      return res.status(409).json({
        status: 'error',
        message: `Login "${req.body.login}" já está em uso`
      })
    }

    if (req.body.senha !== req.body.senha_confirm) {
      return res.status(400).json({
        status: 'error',
        message: 'Os campos senha e senha_confirm precisam ser iguais'
      })
    }

    if (req.body.senha.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'A senha deve ter ao menos 8 caracteres'
      })
    }

    const usuario = await service.register(req.body)
    return res.status(201).json({
      status: 'ok',
      message: 'Usuário registrado com sucesso!',
      data: usuario
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

async function login (req, res) {
  try {
    if (!req.body.login || !req.body.senha) {
      return res.status(400).json({
        status: 'error',
        message: 'Campos obrigatórios faltando: login, senha'
      })
    }

    const usuario = await service.login(req.body)
    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

module.exports = {
  register,
  login
}