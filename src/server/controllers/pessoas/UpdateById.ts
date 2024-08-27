import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";


interface IParamProps {
    id? : number;
}
interface IBodyProps extends Omit<IPessoa,'id'> {}

const paramsValidation:yup.ObjectSchema<IParamProps> = yup.object().shape({
    id:   yup.number().integer().required().moreThan(0) ,
});//Cria a validação dos parâmetros

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    email : yup.string().required().email(),
    cidadeId: yup.number().required().integer().moreThan(0),
    nomeCompleto: yup.string().required().min(3).max(150) ,
});//Cria a validação dos parâmetros


export const updateByIdValidation = validation({
    body : bodyValidation,
    params: paramsValidation,
}); // Passando a validação para uma função que cria o midddleware

export const updateById:RequestHandler = async (req:Request<IParamProps,{},IBodyProps>, res:Response) => { 
    if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{default:"O parâmetro ID é necessário"}
    });
   
    const result = await PessoasProvider.updateById({id:req.params.id , email:req.body.email , cidadeId:req.body.cidadeId , nomeCompleto:req.body.nomeCompleto})
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{default:result.message}
    })
    
    return res.status(StatusCodes.NO_CONTENT).json(result);
}
