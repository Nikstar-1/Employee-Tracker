const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
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
  


  inquirer.prompt({
      
    type: "input",
    message: "What is the name of the department?",
    name: "deptName"

})

  .then((answer) => {
    let readmeContent = generateReadMeMarkdown(answer);
   fs.writeFileSync(path.join(process.cwd(), 'ReadMe.md'), generateReadMeMarkdown(answer)); 
  });
j
  