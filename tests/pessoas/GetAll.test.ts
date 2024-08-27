import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Pessoas - GetAll', ()=>{
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

    it('GetAll Pessoas',async ()=> {
        //Cria um registro antes
        const res1 = await testServer
        .post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            email: 'umemail3@mail.com',
            cidadeId:'1',
            nomeCompleto:'José da Silva',
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');

        //Busca os registros, resposta deve indicar total-count > 0
        const resGetall = await testServer.get('/pessoas').set({Authorization:`Bearer ${accessToken}`});
        expect(Number(resGetall.header['x-total-count'])).toBeGreaterThan(0); // 
        expect(resGetall.statusCode).toEqual(StatusCodes.OK);
        expect(resGetall.body.length).toBeGreaterThan(0);
    });

    it('GetAll pessoas com filtro e paginação',async ()=> {
        const res1 = await testServer.get('/pessoas?page=1&filter=&limit=1').set({Authorization:`Bearer ${accessToken}`})
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });
      
    it('GetAll pessoas com valores de filtro e paginação inválidos ',async ()=> {
        const res1 = await testServer.get('/pessoas?page=-1').set({Authorization:`Bearer ${accessToken}`});
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body) .toHaveProperty('errors.query.page');

        const res2 = await testServer.get('/pessoas?limit=-1').set({Authorization:`Bearer ${accessToken}`});
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body) .toHaveProperty('errors.query.limit');
    });

    it('GetAll sem chave de acesso',async ()=> {
        const res1 = await testServer.get('/pessoas')
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default'); 
    });
});
