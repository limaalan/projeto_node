import {IPessoa } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";

export const getAll = async(page:number, limit:number, filter:string ):Promise<IPessoa[] | Error> => {
    try{
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where('nomeCompleto','like',`%${filter}%`) // % para qualquer coisa antes ou depois.
            .offset((page-1)*limit)
            .limit(limit);
            
        return result;

    } catch(error){
        console.log(error);
        return new Error('Erro ao consultar os registros de pessoas');
  
  }
};