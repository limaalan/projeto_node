import { Request, RequestHandler, Response, json, query } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation  } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services";



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
    } else {
        return res.status(StatusCodes.OK).json({
            accessToken:'teste.teste.teste'
        })
    }

    return res.status(StatusCodes.CREATED).json(result); // Caso deu certo retorna o id do usuario criado

}