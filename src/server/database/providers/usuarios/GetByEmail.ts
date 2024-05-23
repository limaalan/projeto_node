import { IUsuario } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


export const getByEmail = async(email:string):Promise<IUsuario | Error> => {
    try{
        const result = await Knex(ETableNames.usuario)
            .select('*')
            .where('email','=',email)
            .first();

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if ( result ) return result;
        return new Error('Registro não encontrado');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao consultar registro');
  
  }
};