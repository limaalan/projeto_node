import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";


interface IParamProps {
    id? : number ;
}

const paramsValidation:yup.ObjectSchema<IParamProps> = yup.object().shape({
    id:   yup.number().required() ,
});//Cria a validação da query

export const getByIdValidation = validation({
    params : paramsValidation,
}); // Passando a validação para uma função que cria o midddleware

export const getById:RequestHandler = async (req:Request<IParamProps>, res:Response) => { 
   
    console.log(req.params);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("getbyid Não Implementado!");

}