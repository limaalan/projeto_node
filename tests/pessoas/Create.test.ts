import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';
/*
    id: yup.number().required().integer().moreThan(0),
    email : yup.string().required().email(),
    cidadeId: yup.number().required().integer().moreThan(0),
    nomeCompleto: yup.string().required().min(3).max(150) ,
*/
describe ('Pessoas - Create', ()=>{
    let cidadeId :number|undefined = undefined;
    beforeAll(async ()=>{
        const resCidade = await testServer
            .post('/cidades')
            .send({nome:'Teste'})
        cidadeId = resCidade.body;
    });

    it('Criar registro',async ()=> {
        // Não precisa criar registro antes por causa da seed ?
        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'umemail@mail.com',
                cidadeId,
                nomeCompleto:'José da Silva',

        });
            
        //Para no primeiro que deu erro
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro com um email duplicado',async ()=> {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'umemail@mail.com',
                cidadeId,
                nomeCompleto:'Maria da Silva',

        });
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Tenta criar registro com um nome muito grande',async ()=> {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'outroemail@mail.com',
                cidadeId,
                nomeCompleto:'Maria da Silvaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
    });
});
