import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
    return knex
    .schema
    .createTable(ETableNames.usuario,table =>{
        table.bigIncrements('id').primary().index();
        table.string('nome').notNullable().checkLength('>=',3).checkLength('<=',100);
        table.string('senha').notNullable().checkLength('>=',6);
        table.string('email').index().notNullable().unique().checkLength('>',5);

        table.comment('Tabela de usuarios do sistema') // Comentário 
    }).then(()=>{
        console.log(`#Create table ${ETableNames.usuario}`); // Log no terminal para confirmar que deu certo a migrate
    })
}


export async function down(knex: Knex) {
    return knex.schema
    .dropTable(ETableNames.usuario)
    .then(()=>{
        console.log(`# Drop table ${ETableNames.usuario}`)
    });
}

