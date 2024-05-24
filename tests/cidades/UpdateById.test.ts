import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - UpdateById', ()=>{ //id:   yup.number().integer().required().moreThan(0) , // nome:   yup.string().required().min(3) ,
    let accessToken = '';
    beforeAll(async ()=>{
        const email = 'updatebyid-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome:'Teste',
            email,
            senha:'123456'
        });
        const signInRes = await testServer.post('/entrar').send({email,senha:'123456'});
        accessToken = signInRes.body.accessToken;
    });

    it('Update registro',async ()=> {
        //Cria um registro qualquer
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);
        //Tenta atualizar o registro criado
        const resUpdate = await testServer
            .put(`/cidades/${res1.body}`)
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Caxias do Sul'});

        expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT); 
    });
    
    it('Tenta fazer Update de um registro com id inválido',async ()=> {
        const res1 = await testServer
            .put('/cidades/-1')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer
            .put('/cidades/a')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res3 = await testServer
            .put('/cidades/1.5')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');
    });

    it('Tenta fazer Update de um registro com nome muito curto',async ()=> {
        const res1 = await testServer
            .put('/cidades/1')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({nome: 'Ca'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome') 
    });
    
    it('Update registro sem chave de acesso',async ()=> {
       
        const resUpdate = await testServer
            .put(`/cidades/4`)
            .send({nome: 'Caxias do Sul'});

        expect(resUpdate.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resUpdate.body).toHaveProperty('errors.default') 
    });
});