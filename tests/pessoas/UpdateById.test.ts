import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('pessoas - UpdateById', ()=>{ 
    it('Update registro',async ()=> {
        //Cria uma pessoa
        const res = await testServer
            .post('/pessoas')
            .send({
                email: 'meuemail@mail.com',
                cidadeId:'50',
                nomeCompleto:'José da Silva',
            });            

        expect(res.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res.body).toEqual('number');

        //Tenta atualizar o registro criado
        const resUpdate = await testServer
            .put(`/pessoas/${res.body}`)
            .send({
                email: 'eutroqueioemail@mail.com',
                cidadeId:'50',
                nomeCompleto:'José da Silva Sauro',
            });

        expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT); 
    });

    it('Tenta fazer Update de um registro com id inválido',async ()=> {
        const res1 = await testServer
            .put('/pessoas/-1')
            .send({
                email: 'eutroqueioemail@mail.com',
                cidadeId:'50',
                nomeCompleto:'José da Silva Sauro',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

    });

    it('Tenta fazer Update de um registro com nome muito curto',async ()=> {
        const res1 = await testServer
            .put('/pessoas/1')
            .send({
                email: 'eutroqueioemail@mail.com',
                cidadeId:'50',
                nomeCompleto:'Jo',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nomeCompleto') 
    });
    
});