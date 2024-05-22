import { Request, RequestHandler, Response, json, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";



interface IBodyProps extends Omit<IUsuario,'id'> {}

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3).max(100) ,
    email:yup.string().required().email().min(5),
    senha:yup.string().required().min(6)
});//Cria a validação do body



export const signUpValidation = validation({
    body : bodyValidation,
}); // Passando a validação para uma função que cria o midddleware

export const signUp:RequestHandler = async (req:Request<{},{},IBodyProps>, res) => { 
   
    const result = await UsuariosProvider.create(req.body); // Tenta criar usuario
    if( result instanceof Error) { // Caso erro, retorna mensagem de erro da provider
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
            
        })
    }

    return res.status(StatusCodes.CREATED).json(result); // Caso deu certo retorna o id do usuario criado

}