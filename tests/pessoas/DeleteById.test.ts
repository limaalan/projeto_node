import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Pessoas - DeleteById', ()=>{
    let idTeste=0;
    let accessToken='';
    beforeAll(async ()=>{
        const email = 'deletebyid-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;

    });

    it('Deletar registro',async ()=> {
        //Cria uma pessoa
        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
                email: 'meuemail@mail.com',
                cidadeId:'1',
                nomeCompleto:'José da Silva',

        });            
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
        
        //Tenta deletar a pessoa criada
        idTeste = res1.body;
        const resApagada = await testServer.delete(`/pessoas/${idTeste}`).set({Authorization:`Bearer ${accessToken}`});
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT); 
    });

    it('Tenta deletar um registro que não existe',async()=>{
        //Apaga mesma pessoa apagada no caso de teste anterior
        const res1 = await testServer
            .delete(`/pessoas/${idTeste}`)
            .set({Authorization:`Bearer ${accessToken}`});

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    })

    
    it('Tenta deletar registro com id inválido',async ()=> {
        const res1 = await testServer.delete('/pessoas/-1').set({Authorization:`Bearer ${accessToken}`})
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer.delete('/pessoas/a').set({Authorization:`Bearer ${accessToken}`})
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id');
        
        const res3 = await testServer.delete('/pessoas/1.5').set({Authorization:`Bearer ${accessToken}`})
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id'); 
    });

    it('Deletar registro sem chave de acesso',async ()=> {
        //Cria uma pessoa
        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
                email: 'testedeletepessoa@mail.com',
                cidadeId:'1',
                nomeCompleto:'José da Silva',

        });            
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
        
        //Tenta deletar a pessoa criada
        idTeste = res1.body;
        const resApagada = await testServer.delete(`/pessoas/${idTeste}`);
        expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resApagada.body).toHaveProperty('errors.default') 
    });

});