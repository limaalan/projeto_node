import { IPessoa } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";

// TODO : ALTERAR
export const updateById = async(pessoa:IPessoa):Promise<void | Error> => {
    try{
         // Checando a integridade referencial 
         const [{count}] = await Knex(ETableNames.cidade)
         .where('id', '=', pessoa.cidadeId )
         .count<[{count:Number}]>('* as count');

        if (count === 0) {
            return new Error('A cidade utilizada no cadastro do usuário não existe.')
        }

        const result = await Knex(ETableNames.pessoa)
        .update(pessoa)
        .where('id','=',pessoa.id);

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if (result>0 ) return ;

        return new Error('Erro ao atualizar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao atualizar registro');
  
  }
};