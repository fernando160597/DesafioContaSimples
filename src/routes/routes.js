import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import {validaLogin,saldoConta} from '../controllers/contaBancariaController'

const app = express()
app.use(bodyParser.json())

app.get('/empresas',verifyJWT,(req,res,next)=>{
    const dadosEmpresas = require("../mocks/empresas.json")
    res.send(dadosEmpresas)
})

app.get('/saldo',verifyJWT,(req,res)=>{
    
    try{const values = saldoConta(req)
        res.status(200).send(values)
    }catch(error){
        res.status(400).send(error.message)
    }
    
})

app.post('/login',(req,res)=>{
    
    try{const values = validaLogin(req.body)
        res.status(200).send(values)
    }catch(error){
        res.status(401).send(error.message)
    }
    
})


function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, "keyTest", function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        req.empresaId = decoded.id
        next();
    });
}    


export default app