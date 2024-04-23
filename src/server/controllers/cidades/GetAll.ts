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

export const getAll:RequestHandler = async (req:Request<{},{},{},IQueryProps>, res) => { 
   
    console.log(req.query);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Getall Não Implementado!");

}