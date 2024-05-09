import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";

interface IParamsProps {
    id? : number ;
}

const paramsValidation:yup.ObjectSchema<IParamsProps> = yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
});//Cria a validação dos parâmetros


export const deleteByIdValidation = validation({
    params : paramsValidation,
}); // Passando a validação para uma função que cria o midddleware

export const deleteById:RequestHandler = async (req:Request<IParamsProps>, res:Response) => { 
   
    console.log(req.params)
    return res.status(StatusCodes.OK).send("deleteById Não Implementado!");

}
