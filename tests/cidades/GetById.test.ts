import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - GetById', ()=>{
    let accessToken = '';
    beforeAll(async ()=>{
        const email = 'getbyid-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;
    });

    it('GetById Cidades',async ()=> {
        const res1 = await testServer
            .get('/cidades/1')
            .set({Authorization:`Bearer ${accessToken}`});

        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });
       
    it('GetById Cidades com id inválido ',async ()=> { // Number , integer, required, morethan(0)
        const res1 = await testServer
            .get('/cidades/a')
            .set({Authorization:`Bearer ${accessToken}`});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body) .toHaveProperty('errors.params.id');

        const res2 = await testServer
            .get('/cidades/-1')
            .set({Authorization:`Bearer ${accessToken}`});

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body) .toHaveProperty('errors.params.id');

        const res3 = await testServer
            .get('/cidades/1.5')
            .set({Authorization:`Bearer ${accessToken}`});
            
        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res3.body) .toHaveProperty('errors.params.id');
    });

    it('GetById Cidades sem chave de acesso',async ()=> {
        const res1 = await testServer.get('/cidades/1');
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.body') 
    });
});
