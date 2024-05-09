import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - GetAll', ()=>{
    it('GetAll Cidades',async ()=> {
        //Cria um registro antes
        const res1 = await testServer
            .post('/cidades')
            .send({nome : 'Juranda'});
        expect (res1.statusCode).toEqual(StatusCodes.CREATED);

        //Busca os registros, resposta deve indicar total-count > 0
        const resGetall = await testServer.get('/cidades');
        expect(Number(resGetall.header['x-total-count'])).toBeGreaterThan(0); // 
        expect(resGetall.statusCode).toEqual(StatusCodes.OK);
        expect(resGetall.body.length).toBeGreaterThan(0);
    });

    it('GetAll Cidades com filtro e paginação',async ()=> {
        const res1 = await testServer.get('/cidades?page=1&filter=&limit=1')
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });
    
    it('GetAll Cidades com valores de filtro e paginação inválidos ',async ()=> {
        const res1 = await testServer.get('/cidades?page=-1');
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body) .toHaveProperty('errors.query.page');

        const res2 = await testServer.get('/cidades?limit=-1');
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body) .toHaveProperty('errors.query.limit');
    });
});
