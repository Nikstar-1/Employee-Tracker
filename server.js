const inquirer = require("inquirer");
const dbUtil = require("./dbFiles/dbUtil.js");
const dbQueryUtil = require("./dbFiles/dbUtil.js");

init();

function init(){
inquirer
  .prompt({
    type: "list",
    choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Quit"],
    message: "What would you like to do?",
    name: "option",
  })
  .then((answer) => {
    console.log(answer)
    switch (answer.option) {
      case "View Employees":
        return viewAllEmployees();
      case "View Roles":
        return viewAllRoles();
      case "View all Employees By Deparments":
        return viewAllDepartments();
      case "Add Employee":
        return addEmployee();
      case "Update Employee":
        return updateEmployee();
      case "Add Role":
        return addRole();
      case "Add Department":
        return addDepartment();
      case "Quit":
        return quit();
    }
  });
}

async function viewAllEmployees(){
  const employees = await dbQueryUtil.getAllEmployees(); 
  console.table(employees); 
  init();
}

async function viewAllRoles(){
  const role = await dbQueryUtil.viewAllRoles(); 
  console.table(role); 
  init();
}
async function addDepartment(){
  const department = await inquirer.prompt({
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName"
  }
)
await dbQueryUtil.createDepartment(department);
init();
}
async function viewAllDepartments(){

  const departments = await dbQueryUtil.viewAllDepartments(); 
  console.table(departments); 
 init();

}
async function addEmployee(){
  const rolesOptions = await dbUtil.viewAllRoles();
  const managerOptions = await dbUtil.getAllEmployees();

  const employeeToAdd = await inquirer
  .prompt([
    {
      type: "input",
      message: "What's the first name of the employee?",
      name: "first_name"
    },
    {
      type: "input",
      message: "What's the last name of the employee?",
      name: "last_name"
    }
  ])

  var roleChoicesList = rolesOptions.map(({id, title}) => ({ name: title, value: id})); 

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is this new employees role?",
    choices: roleChoicesList
  }); 

  const managerChoicesList = managerOptions.map(({first_name, last_name, id}) => ({ name: first_name + last_name, value: id})); 

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "Please select this new employees manager:",
    choices: managerChoicesList
  })



  employeeToAdd.role_id = roleId; 
  employeeToAdd.manager_id = managerId; 

  await dbUtil.addEmployee(employeeToAdd);

  init();



}


async function addRole(){ 
  const departments = await dbQueryUtil.viewAllDepartments(); 
const departmentsList = departments.map(({id, name}) => ({name: name, value: id})); 

  const roleToAdd = await inquirer
  .prompt([
    {
      type: "input",
      message: "What's the name of the role?",
      name: "title"
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salary"
    },
    {
      type: "list",
      message: "What is the department id number?",
      name: "department_id",
      choices: departmentsList
    }
  ])

   await dbQueryUtil.addRole(roleToAdd);
init();
  }
async function updateEmployee(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "What's the first name of the employee?",
      name: "employeeFirstName"
    },
    {
      type: "input",
      message: "What's the last name of the employee?",
      name: "employeeLastName"
    },
    {
      type: "input",
      message: "What is the employee's role id number?",
      name: "roleIDNumber"
    },
    {
      type: "input",
      message: "What is the manager id number?",
      name: "managerID"
    }
  ])
}


function quit(){
  process.exit();
}









  /*

  //Department 
  inquirer.prompt({
      
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName"

   
  }).then((answer) => {
    connection.query(query, function(err, res) {
      console.log("\You have selected: " + answer.option);
      console.log("choices: ", choices);
      homeScreen();
      })
  

  })
     

  //Add Role
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "totalSalary"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "departmentID"
      }
    ]).then((answer) => {
        connection.query(query, function(err, res) {
          console.log("\You have selected: " + answer.option);
          console.log("choices: ", choices);
          
        })
    })

    //Add Employee
    inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "employeeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "employeeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleIDNumber"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ]).then((answer) => {
      connection.query(query, function(err, res) {
        console.log("\You have selected: " + answer.option);
        console.log("choices: ", choices);
        })
    
    })
   
    //Update Employee
    inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ]).then((answer) => {
      connection.query(query, function(err, res) {
        console.log("\You have selected: " + answer.option);
        console.log("choices: ", choices);
        })
      })  
      

  })
*/

