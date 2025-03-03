const { expect } = require('@playwright/test');
const locators = require('../../support/locators');
const constants = require('../../support/constants');
const { Client } = require('pg')


process.env.DEBUG = 'pw:api,pw:browser*';


exports.DB_connection = async function DB_connection(context){
    console.log("Inside database");
    const client = new Client({
        user: "sanjaykumawat",
        password: "Kumawat@121",
        host: "localhost",
        database: "postgres",
        ssl: false,
        port: 5432
      })
    await client.connect();
    query1 = "CREATE TABLE dummytable1(firstname varchar(10),lastname varchar(10));";
    query2 = "INSERT INTO dummytable1(firstname, lastname) VALUES ('Insuf', 'Amber');";
    query3 = "SELECT * from dummytable1;";
    query4 = "UPDATE dummytable1 SET firstname = 'Sanjay123' WHERE lastname= 'Kumawat';";
    query5 = "delete from dummytable1 where firstname = 'Sanjay' and lastname = 'Kumawat';";
    const res = await client.query(query3);
    await client.end()
    return res.rows;    
   // return true

}