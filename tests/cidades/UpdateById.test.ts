import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - UpdateById', ()=>{ //id:   yup.number().integer().required().moreThan(0) , // nome:   yup.string().required().min(3) ,
    it('Update registro',async ()=> {
        //Cria um registro qualquer
        const res1 = await testServer
            .post('/cidades')
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);
        //Tenta atualizar o registro criado
        const resUpdate = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome: 'Caxias do Sul'});

        expect(resUpdate.statusCode).toEqual(StatusCodes.OK); 
    });

    it('Tenta fazer Update de um registro com id inválido',async ()=> {
        const res1 = await testServer
            .put('/cidades/-1')
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer
            .put('/cidades/a')
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res3 = await testServer
            .put('/cidades/1.5')
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');
    });

    it('Tenta fazer Update de um registro com nome muito curto',async ()=> {
        const res1 = await testServer
            .put('/cidades/1')
            .send({nome: 'Ca'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome') 
    });
    
});