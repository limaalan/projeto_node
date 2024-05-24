import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - Create', ()=>{
    let accessToken = '';
    beforeAll(async ()=>{
        const email = 'create-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;
    })

    it('Criar registro',async ()=> {
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Caxias do Sul'});
            
        //Para no primeiro que deu erro
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro com nome muito curto',async ()=> {
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Ca'});
            
        //Para no primeiro que deu erro
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro sem chave de acesso',async ()=> {
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Caxias do Sul'});
            
        //Para no primeiro que deu erro
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
        expect(res1.body).toHaveProperty('errors.default');
    });
});
