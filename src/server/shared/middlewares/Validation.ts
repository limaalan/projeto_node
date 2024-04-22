import { RequestHandler } from "express";

type TValidation = () => RequestHandler ;

// interface TValidation {
//     (): RequestHandler
// } // outra forma de declarar o tipo de


export const validation:TValidation = () => async (req,res,next) => {
    console.log ('teste')

}