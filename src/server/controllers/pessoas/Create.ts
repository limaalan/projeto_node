import { Request, RequestHandler, Response, json, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";


interface IBodyProps extends Omit<IPessoa,'id'> {}

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    email : yup.string().required().email(),
    cidadeId: yup.number().required().integer().moreThan(0),
    nomeCompleto: yup.string().required().min(3).max(150) ,
});//Cria a validação do body

export const createValidation = validation({
    body : bodyValidation,
    //query : queryValidation,
}); // Passando a validação para uma função que cria o midddleware

export const create:RequestHandler = async (req:Request<{},{},IBodyProps>, res) => { 
   
    const result = await PessoasProvider.create(req.body); // Tenta criar pessoa
    if( result instanceof Error) { // Caso erro, retorna mensagem de erro da provider
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
            
        })
    }

    return res.status(StatusCodes.CREATED).json(result); // Caso deu certo retorna o id da cidade criada

}