import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('pessoas - GetById', ()=>{
    let accessToken ='';
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

    it('Cria pessoa e GetById',async ()=> {

        const res = await testServer
        .post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            email: 'umemail2@mail.com',
            cidadeId:'1',
            nomeCompleto:'José da Silva',
        });
        expect(res.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res.body).toEqual('number');

        const res1 = await testServer.get(`/pessoas/${res.body}`).set({Authorization:`Bearer ${accessToken}`});
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });

    it('Deletar registro e GetById',async ()=> {
        //Cria uma pessoa
        const res = await testServer
            .post('/pessoas')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
                email: 'maisumemail@mail.com',
                cidadeId:'1',
                nomeCompleto:'José da Silva',

        });            
        expect(res.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res.body).toEqual('number');
        
        //Tenta deletar a pessoa criada
        const resApagada = await testServer.delete(`/pessoas/${res.body}`).set({Authorization:`Bearer ${accessToken}`});
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT); 
        
        //Tenta getById num id removido
        const resGetApagado = await testServer.get(`/pessoas/${res.body}`).set({Authorization:`Bearer ${accessToken}`});
        expect(resGetApagado.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resGetApagado.body).toHaveProperty('errors.default');
    });
       
    it('GetById pessoas com id inválido ',async ()=> { // Number , integer, required, morethan(0)
        const res1 = await testServer.get('/pessoas/a').set({Authorization:`Bearer ${accessToken}`});
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body) .toHaveProperty('errors.params.id');

        const res2 = await testServer.get('/pessoas/-1').set({Authorization:`Bearer ${accessToken}`});
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body) .toHaveProperty('errors.params.id');

        const res3 = await testServer.get('/pessoas/1.5').set({Authorization:`Bearer ${accessToken}`});
        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res3.body) .toHaveProperty('errors.params.id');
    });

    it('Cria pessoa e GetById',async ()=> {

        const res = await testServer
        .post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            email: 'testegetbyidpessoas@mail.com',
            cidadeId:'1',
            nomeCompleto:'José da Silva',
        });
        expect(res.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res.body).toEqual('number');

        const res1 = await testServer.get(`/pessoas/${res.body}`)
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default') 
    });
});
