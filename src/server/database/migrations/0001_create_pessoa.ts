import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
    return knex
    .schema
    .createTable(ETableNames.pessoa,table =>{
        table.bigIncrements('id').primary().index();
        table.string('nomeCompleto',150).index().notNullable();
        table.string('email',150).notNullable().unique();

        table
            .bigInteger('cidadeId')
            .index()
            .notNullable()
            .references('id') // diz que o campo é FK da tablea cidade
            .inTable(ETableNames.cidade)
            .onUpdate('CASCADE') // Ex ID da cidade é alterado, para não perder a referência
            .onDelete('RESTRICT'); // Outra opção : SET NULL (sem o notNullable).
        
        table.comment('Tabela de pessoas do sistema') // Comentário 
    }).then(()=>{
        console.log(`#Create table ${ETableNames.pessoa}`); // Log no terminal para confirmar que deu certo a migrate
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pessoa).then(()=>{console.log(`# Drop table ${ETableNames.pessoa}`)});
}

