import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";


interface IParamProps {
    id? : number;
}
interface IBodyProps {
    nome : string;
}

const paramsValidation:yup.ObjectSchema<IParamProps> = yup.object().shape({
    id:   yup.number().integer().required().moreThan(0) ,
});//Cria a validação dos parâmetros

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome:   yup.string().required().min(3) ,
});//Cria a validação dos parâmetros


export const updateByIdValidation = validation({
    body : bodyValidation,
    params: paramsValidation,
}); // Passando a validação para uma função que cria o midddleware

export const updateById:RequestHandler = async (req:Request<IParamProps,{},IBodyProps>, res:Response) => { 
    console.log(req.params);
    console.log(req.body);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("updateById Não Implementado!");
}