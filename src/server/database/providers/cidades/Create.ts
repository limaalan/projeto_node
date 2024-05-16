import { ICidade } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const create = async(cidade:Omit<ICidade,'id'>):Promise<number | Error> => {
    try{
        const[result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if (typeof result ==='object') return result.id;
        if (typeof result ==='number') return result;

        return new Error('Erro ao cadastrar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao cadastrar registro');
  
  }
};