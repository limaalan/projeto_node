import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const deleteById = async(id:number):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.cidade)
            .where('id','=',id)
            .delete()

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if (result>0) return;

        return new Error('Erro ao deletar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao deletar registro');
  
  }
};