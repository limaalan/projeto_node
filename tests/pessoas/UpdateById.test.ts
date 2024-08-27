import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('pessoas - UpdateById', ()=>{ 
    let accessToken='';
    beforeAll(async ()=>{
        const email = 'getall-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;

    });

    it('Update registro',async ()=> {
        //Cria uma pessoa
        const res = await testServer
            .post('/pessoas')
            .set({Authorization:`Bearer ${accessToken}`})
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
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
                email: 'eutroqueioemail@mail.com',
                cidadeId:'50',
                nomeCompleto:'José da Silva Sauro',
            });

        expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT); 
    });

    it('Update registro sem chave de acesso',async ()=> {
        //Cria uma pessoa
        const res = await testServer
            .post('/pessoas')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
                email: 'testeupdatebyid@mail.com',
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

        expect(resUpdate.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resUpdate.body).toHaveProperty('errors.default') 
    });

    it('Tenta fazer Update de um registro com id inválido',async ()=> {
        const res1 = await testServer
            .put('/pessoas/-1')
            .set({Authorization:`Bearer ${accessToken}`})
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
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
                email: 'eutroqueioemail@mail.com',
                cidadeId:'50',
                nomeCompleto:'Jo',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nomeCompleto') 
    });
    
});