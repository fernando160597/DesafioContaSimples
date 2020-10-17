import jwt from 'jsonwebtoken'

/**
* Retorna o token de autorização de acesso a conta
* @param {string} cnpj cnpj da empresa
*/
export const loginValidation = (cnpj) => {
  const companiesData = require('../mocks/empresas.json')

  const searchedLogin = companiesData.filter(it => it.cnpj === cnpj)

  if (searchedLogin[0] !== undefined) {
    const id = searchedLogin[0].empresaId
    const token = jwt.sign({ id }, 'keyTest', { // verificação do token
      expiresIn: 300 // tempo do token em segundos
    })

    const response = { auth: true, token: token }

    return response
  } else { throw new Error('Login invalido') }
}

/**
* Retorna o saldo da conta da empresa logada
* * @param {number} companyId Id da empresa
*/
export const accountBalance = (companyId) => {
  const companiesData = require('../mocks/empresas.json')

  const searchedAccount = companiesData.filter(it => it.empresaId === companyId)

  if (searchedAccount[0] !== undefined) {
    return searchedAccount[0]
  } else { throw new Error('Erro no saldo') }
}

/**
* Retorna a ultima transacao da empresa logada
* * @param {number} companyId Id da empresa
*/

export const lastTransaction = (companyId) => {
  const dadosTransacoes = require('../mocks/transacoes.json')
  const companyTransactions = dadosTransacoes.filter(it => it.empresaId === companyId)
  const last = getLast(companyTransactions)

  if (last !== undefined) {
    return last
  } else { throw new Error('Erro para identificar a última transacao') }
}

/**
* Retorna as transacoes da empresa logada se baseando no filtro de data inicial,
* final e se a transação é de crédito ou não
* * * @param {number} companyId Id da empresa
* * * * @param {string} dataInicial data inicial do filtro
* * * * @param {string} dataFinal data final do filtro
* * * * @param {boolean} credito filtro de crédito ou não cŕedito
*/

export const getByDataAndCredit = (companyId, dataInicial, dataFinal, credito) => {
  const transactionData = require('../mocks/transacoes.json')
  const companyTransactions = transactionData.filter(it => it.empresaId === companyId)

  const filter = companyTransactions.filter(it => Date.parse(it.dataTransacao) >=
    Date.parse(dataInicial) &&
    Date.parse(it.dataTransacao) <= Date.parse(dataFinal) &&
    it.credito === credito)

  if (filter[0] !== undefined) {
    return filter
  } else { throw new Error('erro para obter transações') }
}

/**
* Retorna as transações da empresa logada ordenadas por cartão
* * @param {number} companyId Id da empresa
*/

export const transactionsPerCard = (companyId) => {
  const transactionData = require('../mocks/transacoes.json')
  const companyTransactions = transactionData.filter(it => it.empresaId === companyId)

  const orderedByCard = companyTransactions.sort(sortByProperty('finalCartao'))

  if (orderedByCard[0] !== undefined) {
    return orderedByCard
  } else { throw new Error('erro para obter transações') }
}

/**
* Retorna o ultimo elemento do array
*/
const getLast = (arr = null, n = null) => {
  if (arr == null) return 0
  if (n === null) return arr[arr.length - 1]
  return arr.slice(Math.max(arr.length - n, 0))
}
/**
* Retorna o array ordenado por uma propriedade do json
*/
function sortByProperty (property) {
  return function (a, b) {
    if (a[property] > b[property]) { return 1 } else if (a[property] < b[property]) { return -1 }

    return 0
  }
}
