const connection = require("./connection");

class databaseQueryUtil {
    constructor(connection){
        this.connection = connection;
    }

    getAllEmployees(){
        return this.connection.query(" SELECT * FROM employee"); 
    }
    createEmployee(employee){
        return this.connection.query(" INSERT INTO employee SET ?", employee)

    }
    viewAllRoles(){
        return this.connection.query(" SELECT id, title, salary, department_id AS role FROM role"); 
    }
    createAllRoles(roles){
        return this.connection.query(" INSERT INTO employee SET ?", roles)

    }

    viewAllDepartments(){
        return this.connection.query( "SELECT id, name AS department FROM department"); 
    }
    createAllDepartments(departments){
        return this.connection.query("INSERT INTO employee SET ?", departments)

    }
    addEmployee(newEmployee){
        return this.connection.query("INSERT INTO employee SET ?", newEmployee); 
    }
    createEmployee(employee){
        return this.connection.query("INSERT INTO employee SET ?", employee)

    }
    updateEmployee(){
        return this.connection.query("UPDATE employee SET role_id = role_id WHERE first_name = name"); 
    }
    createEmployee(employee){
        return this.connection.query("INSERT INTO employee SET ?", employee)

    }
    addRole(newRole){
        return this.connection.query("INSERT INTO role SET ?", newRole); 
    }
    createRole(role){
        console.log(role)
        return this.connection.query("INSERT INTO role SET ?", role)
    }
    addDepartment(){
        return this.connection.query(" SELECT * FROM employee"); 
    }
    createDepartment(department){
        return this.connection.query("INSERT INTO department (name) VALUES (?)", department)

    }

}

module.exports = new databaseQueryUtil(connection)
