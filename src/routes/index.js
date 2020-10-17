import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { loginValidation, accountBalance, lastTransaction, getByDataAndCredit, transactionsPerCard } from '../controllers/contaBancariaController'

const app = express()
app.use(bodyParser.json())
/**
 * Retorna as transacoes da empresa contida no token Jwt baseadas nos filtros
 *  de data e tipo da transação, crédito ou débito
 */
app.get('/extrato', verifyJWT, (req, res, next) => {
  try {
    const values = getByDataAndCredit(req.companyId, req.body.dataInicial,
      req.body.dataFinal, req.body.credito)
    res.status(200).send(values)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
/**
 * Retorna as transações ordenadas por cartão da empresa contida no token Jwt
 */
app.get('/transacoesPorCartao', verifyJWT, (req, res, next) => {
  try {
    const values = transactionsPerCard(req.companyId)
    res.status(200).send(values)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * Retorna a última transação da empresa contida no token Jwt
 */
app.get('/ultimaTransacao', verifyJWT, (req, res, next) => {
  try {
    const values = lastTransaction(req.companyId)
    res.status(200).send(values)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
/**
 * Retorna o saldo da empresa contida no token Jwt
 */
app.get('/saldo', verifyJWT, (req, res) => {
  try {
    const values = accountBalance(req.companyId)
    const response = { saldo: values.saldo }
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
/**
 * Retorna o token Jwt baseado no cnpj do login da empresa
 */
app.post('/login', (req, res) => {
  try {
    const values = loginValidation(req.body.cnpj)
    res.status(200).send(values)
  } catch (error) {
    res.status(401).send(error.message)
  }
})

/**
 * verifica se o token Jwt é valido antes de acessar a rota
 */
function verifyJWT (req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, 'keyTest', function (err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' })
    req.companyId = decoded.id
    next()
  })
}

export default app
