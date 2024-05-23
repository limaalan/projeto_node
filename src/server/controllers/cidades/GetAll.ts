import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidades";


interface IQueryProps {
    id?:number;
    page? : number ;
    limit? : number ;
    filter? : string;
}

const queryValidation:yup.ObjectSchema<IQueryProps> = yup.object().shape({
    id:     yup.number().optional().integer().default(0),
    page:   yup.number().optional().moreThan(0) ,
    limit:  yup.number().optional().moreThan(0) ,
    filter: yup.string().optional() ,
});//Cria a validação da query

export const getAllValidation = validation({
    query : queryValidation,
}); // Passando a validação para uma função que cria o midddleware

export const getAll:RequestHandler = async (req:Request<{},{},{},IQueryProps>, res:Response) => { 
    
    const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7 , req.query.filter || '' , req.query.id || 0);
    const count = await CidadesProvider.count(req.query.filter);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{default:result.message}
        });
    } else if (count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{default:count.message}
        });
    }

    res.setHeader('access-control-expose-headers','x-total-count');
    res.setHeader('x-total-count',count);


    console.log(count, req.query,result);
    return res.status(StatusCodes.OK).json(result);

};