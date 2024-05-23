import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticated:RequestHandler =async (req, res, next) =>{
    const {authorization} = req.headers;
    // Checa se tem o header auth
    if (!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{default:"Não autenticado!"}
        });

    };
    // Checa se o tipo do token é 'Bearer'
    const[type, token] = authorization.split(' ');
    if (type !== 'Bearer'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{default:"Não autenticado!"}
        });
    }
    // Checa se o token é válido
    if(token!=="teste.teste.teste"){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{default:"Não autenticado!"}
        })
    }

    return next();

};