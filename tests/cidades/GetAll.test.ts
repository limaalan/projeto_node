import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - GetAll', ()=>{
    let accessToken = '';
    beforeAll(async ()=>{
        const email = 'getall-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;
    });

    it('GetAll Cidades',async ()=> {
        //Cria um registro antes
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);

        //Busca os registros, resposta deve indicar total-count > 0
        const resGetall = await testServer.get('/cidades');
        expect(Number(resGetall.header['x-total-count'])).toBeGreaterThan(0); // 
        expect(resGetall.statusCode).toEqual(StatusCodes.OK);
        expect(resGetall.body.length).toBeGreaterThan(0);
    });

    it('GetAll Cidades com filtro e paginação',async ()=> {
        const res1 = await testServer
        .get('/cidades?page=1&filter=&limit=1')
        .set({Authorization:`Bearer ${accessToken}`})

        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });
    
    it('GetAll Cidades com valores de filtro e paginação inválidos ',async ()=> {
        const res1 = await testServer
        .get('/cidades?page=-1')
        .set({Authorization:`Bearer ${accessToken}`});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body) .toHaveProperty('errors.query.page');

        const res2 = await testServer.get('/cidades?limit=-1');
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body) .toHaveProperty('errors.query.limit');
    });

    it('GetAll sem chave de acesso',async ()=> {
        const res1 = await testServer
        .get('/cidades?page=1&filter=&limit=1')

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.body'); 
    });
});
