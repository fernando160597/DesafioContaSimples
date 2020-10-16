import jwt from 'jsonwebtoken'
export const validaLogin =(body)=>{
    
    
    const dadosUsers = require('../mocks/users.json')
    
    var searchedLogin =  dadosUsers.filter(it => it.name === body.name && it.password === body.password)
    
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
