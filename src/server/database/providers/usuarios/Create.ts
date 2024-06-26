import { IUsuario } from "../../models";
import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";
import { PasswordCrypto } from "../../../shared/services";


export const create = async(usuario:Omit<IUsuario,'id'>):Promise<number | Error> => {
    try{
        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
        usuario.senha=hashedPassword; 
        const[result] = await Knex(ETableNames.usuario).insert(usuario).returning('id');

        // Para lidar com os retornos do SQLITE , que retorna o número ou objeto 
        if (typeof result ==='object') return result.id;
        if (typeof result ==='number') return result;

        return new Error('Erro ao cadastrar registro');
  
    } catch(error){
        console.log(error);
        return new Error('Erro ao cadastrar registro');
  
  }
};