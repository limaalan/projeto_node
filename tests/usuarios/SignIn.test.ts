import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Usuarios - SignIn', ()=>{
    //Cria usuario a ser testado
    beforeAll(async()=>{
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome:"Alan",
                email:"emailteste@mail.com",
                senha:"1234567"
            });
    }) 

    it('Faz login',async ()=> {
        const res1 = await testServer
            .post('/entrar')
            .send({
                email:"emailteste@mail.com",
                senha:"1234567"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Faz login com senha errada',async ()=> {
        const res1 = await testServer
            .post('/entrar')
            .send({
                email:"emailteste@mail.com",
                senha:"senhaerrada"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Faz login com email errado',async ()=> {
        const res1 = await testServer
            .post('/entrar')
            .send({
                email:"emailerrado@mail.com",
                senha:"senhaerrada"
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Faz login com senha em branco',async ()=> {
        const res1 = await testServer
            .post('/entrar')
            .send({
                email:"emailerrado@mail.com",
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.senha');
    });


    
});
