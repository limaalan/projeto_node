import { Request, RequestHandler, Response, json, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";


interface IBodyProps extends Omit<ICidade,'id'> {}

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3).max(150) ,
});//Cria a validação do body

export const createValidation = validation({
    body : bodyValidation,
}); // Passando a validação para uma função que cria o midddleware

export const create:RequestHandler = async (req:Request<{},{},IBodyProps>, res) => { 
   
    const result = await CidadesProvider.create(req.body); // Tenta criar cidade
    if( result instanceof Error) { // Caso erro, retorna mensagem de erro da provider
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
            
        })
    }

    return res.status(StatusCodes.CREATED).json(result); // Caso deu certo retorna o id da cidade criada

}