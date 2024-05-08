import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

describe ('Cidades - Create', ()=>{
    it('Criar registro',async ()=> {
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Caxias do Sul'});
            
        //Para no primeiro que deu erro
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro com nome muito curto',async ()=> {
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Ca'});
            
        //Para no primeiro que deu erro
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});

describe ('Cidades - DeleteById', ()=>{
    it('Deletar registro',async ()=> {
        const res1 = await testServer.delete('/cidades/1');
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });

    it('Tenta deletar registro sem id',async ()=> {
        const res1 = await testServer.delete('/cidades')
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND); 
    });

    it('Tenta deletar registro com id inválido',async ()=> {
        const res1 = await testServer.delete('/cidades/-1')
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer.delete('/cidades/a')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id');
        
        const res3 = await testServer.delete('/cidades/1.5')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id'); 
    });
});

describe ('Cidades - GetAll', ()=>{
    it('GetAll Cidades',async ()=> {
        const res1 = await testServer.get('/cidades');
        expect(res1.statusCode).toEqual(StatusCodes.OK); 
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

describe ('Cidades - UpdateById', ()=>{ //id:   yup.number().integer().required().moreThan(0) , // nome:   yup.string().required().min(3) ,
    it('Update registro',async ()=> {
        const res1 = await testServer
            .put('/cidades/1')
            .send({nome: 'Caxias do Sul'});

        expect(res1.statusCode).toEqual(StatusCodes.OK); 
    });

    it('Tenta fazer update registro com id inválido',async ()=> {
        const res1 = await testServer.put('/cidades/-1')
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.params.id');

        const res2 = await testServer.put('/cidades/a')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id');
        
        const res3 = await testServer.put('/cidades/1.5')
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty('errors.params.id'); 
    });
});