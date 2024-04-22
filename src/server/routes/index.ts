import { Router } from 'express' ;
import { StatusCodes } from 'http-status-codes';

import {CidadesController} from './../controllers'


const router = Router();

router.get('/', (req,res)=>{
    return res.send ("Hello world!");
});

//router.get('/cidades', CidadesController.getAll);
router.post('/cidades',
 CidadesController.createBodyValidator,
 CidadesController.createQueryValidator,
 CidadesController.create,
);




export {router };