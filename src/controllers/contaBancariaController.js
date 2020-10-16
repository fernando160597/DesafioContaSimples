import jwt from 'jsonwebtoken'
export const validaLogin =(body)=>{
    
    
    const dadosEmpresas = require('../mocks/empresas.json')
    
    var searchedLogin =  dadosEmpresas.filter(it => it.cnpj === body.cnpj)
    
    if(searchedLogin[0]!==undefined){
        
        var id = searchedLogin[0].empresaId 
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
        return searchedAccount[0]
    }else{throw new Error ("Invalid request")}
    
}

export const ultimaTransacao = (req) =>{
    
    const dadosTransacoes = require('../mocks/transacoes.json')
    
    var transacoesEmpresa = dadosTransacoes.filter(it=>it.empresaId === req.empresaId)
    const ultima = getLast(transacoesEmpresa)
    
    if(ultima!==undefined){
        return ultima
    }else{throw new Error ("Invalid request")}
    
    
}

let getLast =  (arr = null, n = null) => {
    if (arr == null) return void 0;
    if (n === null) return arr[arr.length - 1];
    return arr.slice(Math.max(arr.length - n, 0));  
};
