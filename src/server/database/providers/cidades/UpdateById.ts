import { ICidade } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const updateById = async(cidade:ICidade):Promise<void | Error> => {
    try{
        const result = await Knex(ETableNames.cidade)
        .update(cidade)
        .where('id','=',cidade.id);

        if (result>0 ) return ;

        return new Error('Erro ao atualizar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao atualizar registro');
  
  }
};