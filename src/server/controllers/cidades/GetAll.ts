import { Request, RequestHandler, Response, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";


interface IQueryProps {
    page? : number ;
    limit? : number ;
    filter? : string;
}

const queryValidation:yup.ObjectSchema<IQueryProps> = yup.object().shape({
    page:   yup.number().optional().moreThan(0) ,
    limit:  yup.number().optional().moreThan(0) ,
    filter: yup.string().optional() ,
});//Cria a validação da query

export const getAllValidation = validation({
    query : queryValidation,
}); // Passando a validação para uma função que cria o midddleware

export const getAll:RequestHandler = async (req:Request<{},{},{},IQueryProps>, res:Response) => { 
   //Para mock dos testes
    res.setHeader('access-control-expose-headers','x-total-count');
    res.setHeader('x-total-count',1);

    console.log(req.query);
    //return res.status(StatusCodes.OK).send("Getall Não Implementado!");
    return res.status(StatusCodes.OK).json([
        {
            id : 1,
            nome : 'Juranda',
        }
    ]);

};