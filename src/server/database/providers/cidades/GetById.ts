import { ICidade } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const create = async(id:number):Promise<ICidade | Error> => {
    try{
        const[result] = await Knex(ETableNames.cidade)
            .select('id','nome')
            .where('id','=',id)
            .first();

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if ( result ) return result;
        return new Error('Registro não encontrado');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao consultar registro');
  
  }
};