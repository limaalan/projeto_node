import { Router } from 'express' ;

import {CidadesController, PessoasController, UsuariosController} from './../controllers'


const router = Router();

router.get('/', (req,res)=>{
    return res.send ("Hello world!");
});

//Rotas de cidades
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll,); // Obtém todas cidades 
router.post('/cidades',CidadesController.createValidation, CidadesController.create,); // Cria uma nova cidade
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById,); // Obtém uma cidade de id = id 
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById,); // Atualiza a cidade de id = id 
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById,); // Deleta uma cidade de id = id 

//Rotas de pessoas
router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll,); // Obtém todas pessoas 
router.post('/pessoas',PessoasController.createValidation, PessoasController.create,); // Cria uma nova pessoa
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById,); // Obtém uma pessoa de id = id 
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById,); // Atualiza a pessoa de id = id 
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById,); // Deleta uma pessoa de id = id 

//Rotas de usuários
router.post('/entrar',UsuariosController.signInValidation,UsuariosController.signIn); // Rota de login
router.post('/cadastrar',UsuariosController.signUpValidation,UsuariosController.signUp); // Rota de cadastro

export {router };