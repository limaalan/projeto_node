import supertest from "supertest";
import {server} from '../src/server/Server';

export const testServer = supertest(server);

//testServer.get('/cidades/1');
//testServer.post('/cidades').send({nome:'Teste'});