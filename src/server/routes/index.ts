import { Router } from 'express' ;
import { StatusCodes } from 'http-status-codes';

import {CidadesController} from './../controllers'


const router = Router();

router.get('/', (req,res)=>{
    return res.send ("Hello world!");
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll,); // Obtém todas cidades 
router.post('/cidades',CidadesController.createValidation, CidadesController.create,); // Cria uma nova cidade
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById,); // Obtém uma cidade de id = id 
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById,); // Atualiza a cidade de id = id 
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById,); // Deleta uma cidade de id = id 




export {router };