import { Router } from 'express' ;

import {CidadesController, PessoasController, UsuariosController} from './../controllers'
import { ensureAuthenticated } from '../shared/middlewares';


const router = Router();

router.get('/', (req,res)=>{
    return res.send ("Hello world!");
});

//Rotas de cidades, privadas
router.get('/cidades',ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll,); // Obtém todas cidades 
router.post('/cidades',ensureAuthenticated,CidadesController.createValidation, CidadesController.create,); // Cria uma nova cidade
router.get('/cidades/:id',ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById,); // Obtém uma cidade de id = id 
router.put('/cidades/:id',ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById,); // Atualiza a cidade de id = id 
router.delete('/cidades/:id',ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById,); // Deleta uma cidade de id = id 

//Rotas de pessoas , privadas
router.get('/pessoas',ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll,); // Obtém todas pessoas 
router.post('/pessoas',ensureAuthenticated,PessoasController.createValidation, PessoasController.create,); // Cria uma nova pessoa
router.get('/pessoas/:id',ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById,); // Obtém uma pessoa de id = id 
router.put('/pessoas/:id',ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById,); // Atualiza a pessoa de id = id 
router.delete('/pessoas/:id',ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById,); // Deleta uma pessoa de id = id 

//Rotas de usuários
router.post('/entrar', UsuariosController.signInValidation,UsuariosController.signIn); // Rota de login
router.post('/cadastrar', UsuariosController.signUpValidation,UsuariosController.signUp); // Rota de cadastro

export {router };