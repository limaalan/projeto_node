import express from 'express' ;

const server = express();

interface Teste {
    
}

//Configurações do servidor vão aqui
server.get('/', (req,res)=>{
    return res.send ("Hello world!");
});


export {server};