import jwt from 'jsonwebtoken'
export const validaLogin =(body)=>{
    
    
    const dadosEmpresas = require('../mocks/empresas.json')
    
    var searchedLogin =  dadosEmpresas.filter(it => it.cnpj === body.cnpj)
    
    if(searchedLogin[0]!==undefined){
        
        var id = searchedLogin[0].id 
        var token = jwt.sign({id},"keyTest",{ //verificação do token
            expiresIn:300 //tempo do token 
        })
        
        const resposta = { auth: true, token: token }
        
        return resposta
    }
    else{throw new Error ("Login invalido")}
}

export const saldoConta = (req) =>{
    
    const dadosEmpresas = require('../mocks/empresas.json')
    
    var searchedAccount =  dadosEmpresas.filter(it=>it.empresaId === req.empresaId)
    
    if(searchedAccount[0]!==undefined){
        return searchedAccount
    }else{throw new Error ("Login invalido")}
    
    
}
