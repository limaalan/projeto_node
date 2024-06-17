import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Usuarios - Create', ()=>{
    it('Criar registro',async ()=> {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Alan",
                email:"meuemail@mail.com",
                senha:"1234567"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro duplicado',async ()=> {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Alan",
                email:"meuemail@mail.com",
                senha:"1234567"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty("errors.default");
    });

    it('Tenta criar registro com email inválido',async ()=> {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Alan",
                email:"email invalido",
                senha:"1234567"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro com email curto',async ()=> {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Alan",
                email:"a@b",
                senha:"1234567"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro com nome curto',async ()=> {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Al",
                email:"email@mail.com",
                senha:"1234567"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    it('Tenta criar registro com senha curta',async ()=> {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Al",
                email:"email@mail.com",
                senha:"12345"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.senha');
    });
});
