import { Request, RequestHandler, Response, json, query } from "express"
import { ACCEPTED, StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { JWTService, PasswordCrypto } from "../../shared/services";



interface IBodyProps extends Omit<IUsuario,'id'|'nome'> {}

const bodyValidation:yup.ObjectSchema<IBodyProps> = yup.object().shape({
    email:yup.string().required().email().min(5),
    senha:yup.string().required().min(6)
});//Cria a validação do body



export const signInValidation = validation({
    body : bodyValidation,
}); // Passando a validação para uma função que cria o midddleware

export const signIn:RequestHandler = async (req:Request<{},{},IBodyProps>, res) => { 
   
    const {email,senha} = req.body;

    const result = await UsuariosProvider.getByEmail(email); // busca usuário no banco
    if( result instanceof Error) { // Caso erro, retorna mensagem de erro da provider
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos!"
            }
            
        })
    }

    if (! await PasswordCrypto.verifyPassword(senha,result.senha)){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos!"
            }
            
        })
    }

    const accessToken = JWTService.sign({uid:result.id});
    if (accessToken ==='JWT_SECRET_NOT_FOUND'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{default:'Erro ao gerar token'}
        })

    }
    return res.status(StatusCodes.OK).json({ accessToken:accessToken })
    


}