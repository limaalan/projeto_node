import { IPessoa } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";

export const getById = async(id:number):Promise<IPessoa | Error> => {
    try{
        const result = await Knex(ETableNames.pessoa)
            .select('id','nomeCompleto','email','cidadeId')
            .where('id','=',id)
            .first();

        if ( result ) return result;
        return new Error('Registro de pessoa não encontrado');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao consultar registro de pessoa ');
  
  }
};