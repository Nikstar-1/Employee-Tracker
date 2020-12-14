const inquirer = require("inquirer");
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
      case "Add Employee?":
        return addEmployee();
      case "Update Employee":
        return updateEmployee();
      case "Add Role?":
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
}

async function viewAllRoles(){
  const role = await dbQueryUtil.viewAllRoles(); 
  console.table(role); 
  
}
async function addDepartment(){
  inquirer.prompt({
      
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName"

  }
).then (async response =>{
console.log(response)
var departmentName = await dbQueryUtil.createDepartment(response.departmentName);
console.log(departmentName)
})
}
async function viewAllDepartments(){

  const departments = await dbQueryUtil.viewAllDepartments(); 
  console.table(departments); 
 

}
async function addEmployee(){
  const employeeToAdd = await inquirer
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


async function addRole(){ 
  const roleToAdd = await inquirer
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
  ])
.then (async response =>{
  console.log(response)
  var roleName = await dbQueryUtil.createRole(response.addRole);
  console.log(roleName)
  })
  }
  async function addRole(){
  
    const role = await dbQueryUtil.viewAddRole(); 
    console.table(role); 
   
  }

/*async function addDepartment(){
  inquirer.prompt({
      
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName"

  }
)
}
*/

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
}
