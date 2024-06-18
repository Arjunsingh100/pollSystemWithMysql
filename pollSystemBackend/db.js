const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Arjun@12345',
    database:'pollSystem'
});

module.exports=connection;