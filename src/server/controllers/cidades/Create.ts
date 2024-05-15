import { Request, RequestHandler, Response, json, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { ICidade } from "../../database/models";


interface IBodyProps extends Omit<ICidade,'id'> {}

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3) ,
    //estado : yup.string().required().min(3),
});//Cria a validação do body

// interface IFilter {
//     filter?: string ;
// }
// const queryValidation:yup.ObjectSchema<IFilter> = yup.object().shape({
//     //filter: yup.string().min(3) , 
//     filter: yup.string().optional().min(3) , //Funciona do mesmo jeito que sem o .optional()
// }); //Cria a validação dos parâmetros

export const createValidation = validation({
    body : bodyValidation,
    //query : queryValidation,
}); // Passando a validação para uma função que cria o midddleware

export const create:RequestHandler = async (req:Request<{},{},IBodyProps>, res) => { 
   
    console.log(req.body);
    return res.status(StatusCodes.CREATED).json(1);

}