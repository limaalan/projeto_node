import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";


interface IParamProps {
    id? : number ;
}

const paramsValidation:yup.ObjectSchema<IParamProps> = yup.object().shape({
    id:   yup.number().integer().required().moreThan(0) ,
});//Cria a validação dos parâmetros

export const getByIdValidation = validation({
    params : paramsValidation,
}); // Passando a validação para uma função que cria o midddleware

export const getById:RequestHandler = async (req:Request<IParamProps>, res:Response) => { 
   
    console.log(req.params);
    return res.status(StatusCodes.OK).send("getbyid Não Implementado!");

}