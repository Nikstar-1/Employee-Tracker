const connection = require("./connection");

class databaseQueryUtil {
    constructor(connection){
        this.connection = connection;
    }

    createEmployee(employee){
        return this.connection.query("INSERT INTO employee SET ?", employee)

    }
}

module.exports = new databaseQueryUtil(connection)