import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";
import { isImportClause, nodeModuleNameResolver } from "typescript";


interface IParamProps {
    id? : number;
}
interface IBodyProps extends Omit<ICidade,'id'> {}

const paramsValidation:yup.ObjectSchema<IParamProps> = yup.object().shape({
    id:   yup.number().integer().required().moreThan(0) ,
});//Cria a validação dos parâmetros

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome:   yup.string().required().min(3).max(150) ,
});//Cria a validação dos parâmetros


export const updateByIdValidation = validation({
    body : bodyValidation,
    params: paramsValidation,
}); // Passando a validação para uma função que cria o midddleware

export const updateById:RequestHandler = async (req:Request<IParamProps,{},IBodyProps>, res:Response) => { 
    if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{default:"O parâmetro ID é necessário"}
    });
   
    const result = await CidadesProvider.updateById({id:req.params.id,nome:req.body.nome})
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{default:result.message}
    })
    
    console.log(req.params);
    console.log(req.body);
    return res.status(StatusCodes.NO_CONTENT).json(result);
}
