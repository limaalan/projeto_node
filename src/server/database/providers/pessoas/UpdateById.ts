import { IPessoa } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";

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

        if (result>0 ) return ;

        return new Error('Erro ao atualizar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao atualizar registro');
  
  }
};