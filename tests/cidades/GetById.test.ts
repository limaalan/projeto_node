import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - GetById', ()=>{
    it('GetById Cidades',async ()=> {
        const res1 = await testServer.get('/cidades/1');
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });
       
    it('GetById Cidades com id inválido ',async ()=> { // Number , integer, required, morethan(0)
        const res1 = await testServer.get('/cidades/a');
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body) .toHaveProperty('errors.params.id');

        const res2 = await testServer.get('/cidades/-1');
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body) .toHaveProperty('errors.params.id');

        const res3 = await testServer.get('/cidades/1.5');
        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res3.body) .toHaveProperty('errors.params.id');
    });
});
