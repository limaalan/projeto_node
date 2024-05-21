import {IPessoa } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";

export const getAll = async(page:number, limit:number, filter:string , id = 0):Promise<IPessoa[] | Error> => {
    try{
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where('id','=',id)
            .orWhere('nomeCompleto','like',`%${filter}%`) // % para qualquer coisa antes ou depois.
            .offset((page-1)*limit)
            .limit(limit);
        // if (id > 0 && result.every((item: { id: number; }) => item.id !== id)){ // Caso o usuário passe um id e ele não esteja dentre os registros retornados dentre o <LIMIT> 
        //     const resultById= await Knex(ETableNames.pessoa)
        //         .select('*')
        //         .where('id','=',id)
        //         .first();

        //     if (resultById) return [...result,resultById];
        return result;

    } catch(error){
        console.log(error);
        return new Error('Erro ao consultar os registros de pessoas');
  
  }
};