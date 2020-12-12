const mysql = require("mysql"); 
const util = require("util"); 

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'development',
    database : 'mysql1',
  });
   
  connection.connect();

  connection.query = util.promisify(connection.query); 
    
 module.exports = connection; 