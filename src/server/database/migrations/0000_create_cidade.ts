import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
    return knex
    .schema
    .createTable(ETableNames.cidade,table =>{
        table.bigIncrements('id').primary().index();
        table.string('nome',150).checkLength('<=',150).index().notNullable();
        table.comment('Tabela de Cidades do sistema') // Comentário 
    }).then(()=>{
        console.log(`#Create table ${ETableNames.cidade}`); // Log no terminal para confirmar que deu certo a migrate
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.cidade);
}

