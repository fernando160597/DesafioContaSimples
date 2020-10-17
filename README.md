# Meu Projeto

## Descrição
Este é meu projeto para o desafio backend da empresa Conta Simples, este projeto simula acessos a conta bancária de uma empresa.

## Pré-Requisitos
- NodeJS 

## Executando o projeto
- Clone o repositório
- Acesse a pasta raiz e execute o seguinte comando:
```
  npm install
  npm start
```

## Rotas Disponíveis


### Login
*POST /login* - Retorna o token de autenticação da empresa para acesso da conta
---
#### Parâmetros: 
| Nome           | Local | Descrição         | Exemplo              | 
|----------------|-------|-------------------|----------------------|
| cnpj           | body  | cnpj da empresa   | "13182905000171"     |


#### Retornos:
| Status | Descrição             | Body                                     |
|--------|-----------------------|------------------------------------------|
| 200    | Login  válido         | objeto com o token de autorização        |
| 401    | Login  inválido       | objeto descrevendo o parâmetro incorreto |

---

### Saldo
*GET /saldo* - Retorna o saldo da empresa do token JWT
---
#### Parâmetros: 
| Key            | Local    | Descrição         | Value                     | 
|----------------|-------   |-------------------|---------------------------|
| Content-Type   | headers  | aplicacao json    | application/json          |
| x-access-token | headers  | token de acesso   | token retornado no login  |


#### :
| Status | Descrição             | Body                                     |
|--------|-----------------------|------------------------------------------|
| 200    | saldo                 | objeto com o saldo                       |
| 400    | erro no saldo         | objeto descrevendo o parâmetro incorreto |

---

### Última transação
*GET /ultimaTransacao* - Retorna a ultima transação da empresa do token JWT
---
#### Parâmetros: 
| Key            | Local    | Descrição         | Value                     | 
|----------------|-------   |-------------------|---------------------------|
| Content-Type   | headers  | aplicacao json    | application/json          |
| x-access-token | headers  | token de acesso   | token retornado no login  |


#### Retornos:
| Status | Descrição             | Body                                     |
|--------|----------------------------|------------------------------------------|
| 200    | ultima transação           | objeto com a ultima transação            |
| 400    | erro para obter transação  | objeto descrevendo o parâmetro incorreto |

---

### Transações por cartão
*GET /transacoesPorCartao* - Retorna as transações da empresa do token JWT ordenadas pelos cartões
---
#### Parâmetros: 
| Key            | Local    | Descrição         | Value                     | 
|----------------|-------   |-------------------|---------------------------|
| Content-Type   | headers  | aplicacao json    | application/json          |
| x-access-token | headers  | token de acesso   | token retornado no login  |


#### Retornos:
| Status | Descrição             | Body                                     |
|--------|----------------------------    |----------------------------------------------|
| 200    | transações ordenadas por cartão| objeto com as transações ordenadas por cartão|
| 400    | erro para obter transações     | objeto descrevendo o parâmetro incorreto     |

---

### Extrato
*GET /extrato* - Retorna o extrato da empresa do token JWT usando os filtros de data e crédito
---
#### Parâmetros: 
| Key            | Local    | Descrição         | Value                     | 
|----------------|-------   |-------------------|---------------------------|
| Content-Type   | headers  | aplicacao json    | application/json          |
| x-access-token | headers  | token de acesso   | token retornado no login  |

#### Parâmetros: 
| Nome           | Local | Descrição                                        | Exemplo              | 
|----------------|-------|--------------------------------------------------|----------------------|
| dataInicial    | body  | data inicial do extrato no formato "YYYY-MM--DD  | "2020-09-01"         |
| dataFinal      | body  | data final do extrato no formato   "YYYY-MM--DD  | "2020-09-22"         |
| credito        | body  | true para créditos false para débitos            | true                 |


#### Retornos:
| Status | Descrição                      | Body                                         |
|--------|--------------------------------|----------------------------------------------|
| 200    | extrato com filtro             | objeto com o extrato                         |
| 400    | erro para obter transações     | objeto descrevendo o parâmetro incorreto     |

---

