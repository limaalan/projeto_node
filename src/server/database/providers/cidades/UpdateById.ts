import { ICidade } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const updateById = async(cidade:ICidade):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.cidade)
        .update(cidade.nome)
        .where('id','=',cidade.id);

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if (result>0 ) return ;

        return new Error('Erro ao atualizar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao atualizar registro');
  
  }
};