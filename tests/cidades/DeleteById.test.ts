import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - DeleteById', ()=>{
    let accessToken = '';
    beforeAll(async ()=>{
        const email = 'deletebyid-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;
    });

    it('Deletar registro',async ()=> {
        //Cria uma cidade
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);

        //Tenta deletar a cidade criada
        const resApagada = await testServer.delete(`/cidades/${res1.body}`);
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT); 
    });

    it('Tenta deletar registro sem id',async ()=> {
        const res1 = await testServer
        .delete('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})

        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND); 
    });

    it('Tenta deletar registro com id inválido',async ()=> {
        const res1 = await testServer.delete('/cidades/-1').set({Authorization:`Bearer ${accessToken}`})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer.delete('/cidades/a').set({Authorization:`Bearer ${accessToken}`})

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id');
        
        const res3 = await testServer.delete('/cidades/1.5').set({Authorization:`Bearer ${accessToken}`})

        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res3.body).toHaveProperty('errors.params.id'); 
    });

    it('Deletar registro sem chave de acesso',async ()=> {
        //Cria uma cidade
        const res1 = await testServer
            .post('/cidades')
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);

        //Tenta deletar a cidade criada
        const resApagada = await testServer.delete(`/cidades/${res1.body}`);
        expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resApagada.body).toHaveProperty('errors.default') 
    });

});