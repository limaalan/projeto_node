import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { PessoasProvider } from "../../database/providers/pessoas";


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

    if (!req.params.id) { 
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default:"O Parâmetro Id é necessário"
            }
        });
    }; // Nunca vai acontecer isso aqui

    const result = await PessoasProvider.getById(req.params.id);
    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default:result.message
            }
        });
    };
   
    return res.status(StatusCodes.OK).json(result);

}
