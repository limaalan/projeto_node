import { ICidade } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const getById = async(id:number):Promise<ICidade | Error> => {
    try{
        const result = await Knex(ETableNames.cidade)
            .select('id','nome')
            .where('id','=',id)
            .first();

        if ( result ) return result;
        return new Error('Registro não encontrado');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao consultar registro');
  
  }
};