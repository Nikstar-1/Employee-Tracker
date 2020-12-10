const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
  //Port 3306
    port: 3306,
    user: "start",
    password: "start",
    database: ""
  });



  //First log in prompts
  inquirer
  .prompt({
    type: "list",
    choices: [
      "Add department",
      "Add role",
      "Add employee",
      "View departments",
      "View roles",
      "View employees",
      "Update employee role",
      "Quit"
    ],
    message: "What would you like to do?",
    name: "option"
  })

  .then(function(result) {
    console.log("You have selected: " + answer.option);

  switch (choices) {
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "ADD_ROLE":
      return addRole();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "VIEW_ROLES":
        return viewRoles();
		case "VIEW_EMPLOYEES":
      return viewEmployees();
      case 'UPDATE_EMPLOYEE_ROLE':
        return updateEmployeeRole();
      case 'REMOVE_EMPLOYEE':
        return removeEmployee();
		case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
			return viewEmployeesByDepartment();
		case "ADD_EMPLOYEE":
		  return addEmployee();
		case 'REMOVE_EMPLOYEE':
			return removeEmployee();
		case 'UPDATE_EMPLOYEE_ROLE':
      return updateEmployeeRole();
      case 'REMOVE_ROLE':
        return removeRole();
      default:
        return quit();
		
	}



  //Department 
  inquirer.prompt({
      
    type: "input",
    message: "What is the name of the department?",
    name: "dptName"

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
        name: "dptID"
      }
    ])

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
    ])
   
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
    ])

  .then((answer) => {
    let readmeContent = generateReadMeMarkdown(answer);
   fs.writeFileSync(path.join(process.cwd(), 'ReadMe.md'), generateReadMeMarkdown(answer)); 
  });
  })