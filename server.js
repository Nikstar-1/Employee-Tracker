const inquirer = require("inquirer");
const dbUtil = require("./dbFiles/dbUtil.js");
const dbQueryUtil = require("./dbFiles/dbUtil.js");

init();

function init() {
  inquirer
    .prompt({
      type: "list",
      choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Quit"],
      message: "What would you like to do?",
      name: "option",
    })
    .then((answer) => {
      console.log(answer);
      switch (answer.option) {
        case "View Employees":
          return viewAllEmployees();
        case "View Roles":
          return viewAllRoles();
        case "View Deparments":
          return viewAllDepartments();
        case "Add Employee":
          return addEmployee();
        case "Add Role":
          return addRole();
        case "Add Department":
          return addDepartment();
        case "Update Employee Role":
          return updateEmployee();
        case "Quit":
          return quit();
      }
    });
}

async function viewAllEmployees() {
  const employees = await dbQueryUtil.getAllEmployees();
  console.table(employees);
  init();
}
async function viewAllRoles() {
  const role = await dbQueryUtil.viewAllRoles();
  console.table(role);
  init();
}
async function viewAllDepartments() {
  const departments = await dbQueryUtil.viewAllDepartments();
  console.table(departments);
  init();
}
async function addDepartment() {
  const department = await inquirer.prompt({
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
  });
  await dbQueryUtil.createDepartment(department);
  init();
}
async function addEmployee() {
  const rolesOptions = await dbUtil.viewAllRoles();
  const managerOptions = await dbUtil.getAllEmployees();

  const employeeToAdd = await inquirer.prompt([
    {
      type: "input",
      message: "What's the first name of the employee?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What's the last name of the employee?",
      name: "last_name",
    },
  ]);

  var roleChoicesList = rolesOptions.map(({ id, title }) => ({ name: title, value: id }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is this new employees role?",
    choices: roleChoicesList,
  });

  const managerChoicesList = managerOptions.map(({ first_name, last_name, id }) => ({ name: first_name + last_name, value: id }));

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "Please select this new employees manager:",
    choices: managerChoicesList,
  });

  employeeToAdd.role_id = roleId;
  employeeToAdd.manager_id = managerId;

  await dbUtil.createEmployee(employeeToAdd);

  init();
}
async function addRole() {
  const departments = await dbQueryUtil.viewAllDepartments();
  const departmentsList = departments.map(({ id, name }) => ({ name: name, value: id }));

  const roleToAdd = await inquirer.prompt([
    {
      type: "input",
      message: "What's the name of the role?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salary",
    },
    {
      type: "list",
      message: "What is the department id number?",
      name: "department_id",
      choices: departmentsList,
    },
  ]);

  await dbQueryUtil.addRole(roleToAdd);
  init();
}
async function updateEmployee() {
  const employeeOptions = await dbUtil.getAllEmployees();

  const rolesOptions = await dbUtil.viewAllRoles();
  console.log(rolesOptions);

  const employeeOptionsToChooseFrom = employeeOptions.map(({ id, first_name, last_name }) => ({
    name: first_name + last_name,
    value: id,
  }));

  const rolesOptionsToChooseFrom = rolesOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select the employee whose role you wish to change:",
      choices: employeeOptionsToChooseFrom,
    },
  ]);

  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleId",
      message: "What new role would you like to assign to this employee?",
      choices: rolesOptionsToChooseFrom,
    },
  ]);

  await dbUtil.updateEmployeeRole(employeeId, roleId);
  init();
}

function quit() {
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
