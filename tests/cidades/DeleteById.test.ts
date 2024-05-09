import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - DeleteById', ()=>{
    it('Deletar registro',async ()=> {
        //Cria uma cidade
        const res1 = await testServer
            .post('/cidades')
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);

        //Tenta deletar a cidade criada
        const resApagada = await testServer.delete(`/cidades/${res1.body}`);
        expect(resApagada.statusCode).toEqual(StatusCodes.OK); 
    });

    it('Tenta deletar registro sem id',async ()=> {
        const res1 = await testServer.delete('/cidades')
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND); 
    });

    it('Tenta deletar registro com id inválido',async ()=> {
        const res1 = await testServer.delete('/cidades/-1')
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer.delete('/cidades/a')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id');
        
        const res3 = await testServer.delete('/cidades/1.5')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id'); 
    });

});