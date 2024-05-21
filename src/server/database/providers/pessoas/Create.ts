import { ICidade, IPessoa } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";

export const create = async(pessoa:Omit<IPessoa,'id'>):Promise<number | Error> => {
    try{
        // Checando a integridade referencial 
        const [{count}] = await Knex(ETableNames.cidade)
            .where('id', '=', pessoa.cidadeId )
            .count<[{count:Number}]>('* as count');

        if (count == 0) {
            return new Error('A cidade utilizada no cadastro do usuário não existe.')
        }

        // Salvando novo usuário
        const[result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if (typeof result ==='object') return result.id;
        if (typeof result ==='number') return result;

        return new Error('Erro ao cadastrar registro de pessoa');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao cadastrar registro de pessoa');
  
  }
};