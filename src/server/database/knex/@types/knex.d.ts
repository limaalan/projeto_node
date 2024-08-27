import { ICidade,IPessoa,IUsuario } from "../../models"
declare module 'knex/types/tables'{
    interface Tables{
        cidade: ICidades 
        pessoa: IPessoa 
        usuario: IUsuario 
    }
}