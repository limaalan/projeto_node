import { Router } from 'express' ;
import { StatusCodes } from 'http-status-codes';

import {CidadesController} from './../controllers'


const router = Router();

router.get('/', (req,res)=>{
    return res.send ("Hello world!");
});

router.get('/cidades',
 CidadesController.getAllValidation,
 CidadesController.getAll,
); // Obtém todas cidades 

router.post('/cidades',
 CidadesController.createValidation,
 CidadesController.create,
); // Cria uma nova cidade





export {router };