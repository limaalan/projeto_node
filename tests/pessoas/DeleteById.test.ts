import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Pessoas - DeleteById', ()=>{
    let idTeste=0;

    it('Deletar registro',async ()=> {
        //Cria uma pessoa
        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'meuemail@mail.com',
                cidadeId:'1',
                nomeCompleto:'José da Silva',

        });            
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
        
        //Tenta deletar a pessoa criada
        idTeste = res1.body;
        const resApagada = await testServer.delete(`/pessoas/${idTeste}`);
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT); 
    });

    it('Tenta deletar um registro que não existe',async()=>{
        //Apaga mesma pessoa apagada no caso de teste anterior
        const res1 = await testServer.delete(`/pessoas/${idTeste}`);
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    })

    
    it('Tenta deletar registro com id inválido',async ()=> {
        const res1 = await testServer.delete('/pessoas/-1')
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer.delete('/pessoas/a')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id');
        
        const res3 = await testServer.delete('/pessoas/1.5')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id'); 
    });

});