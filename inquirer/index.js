// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const db = require("../db/connection");
const fs = require("fs");
const { Console } = require("console");
require("console.table");

db.connect(() => {
  console.log("Welcome to Employee Manager");
  init();
});

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      "Quit",
    ],
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Choose an option");
        return false;
      }
    },
  },
];

const addDepartmentsQuestion = [ 
  {
    type: "input", 
    name: "name",
    message: "What is the name of this department?"
}
];

const addRolesQuestion = [
  {
    type: "input",
    name: "title",
    message: "What is title of the role?"
  },
  {
    type: "input",
    name: "department_id",
    message: "What is the role's correlating department ID?"
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of this role?"
  },
];

const addEmployeesQuestion = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?"
  },
  {
    type: "input",
    name: "role_id",
    message: "What is the employee's correlating role ID?"
  },
  {
    type: "input",
    name: "manager_id",
    message: "What is the employee's manager's ID?",
  },
];

const updateEmployeesQuestion = [
  {
    type: "input",
    name: "id",
    message: "What is the ID of the employee whose role you wish to update?"
  },
  {
    type: "input",
    name: "role_id",
    message: "What is the ID of the new role you wish to assign?"
  },
];

// TODO: Create functions to link choice to tables

function init() {
  inquirer.prompt(questions).then((response) => {
    if (response.options === "View All Departments") {
      viewDepartments();
    } else if (response.options === "View All Roles") {
      viewRoles();
    } else if (response.options === "View All Employees") {
      viewEmployees();
    } else if (response.options === "Add Department") {
      addDepartments();
    } else if (response.options === "Add Role") {
      addRoles();
    } else if (response.options === "Add Employee") {
      addEmployees(); 
    } else if (response.options === "Update Employee Role") {
      updateEmployees();
    }
  });
}

// TODO: Create functions to display tables

function viewDepartments() {
  let sql = "SELECT * FROM departments";
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    init();
  });
}

function viewRoles() {
  let sql =
    "SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id";
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    init();
  });
}

function viewEmployees() {
  let sql =
  "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id" ;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    init();
  });
}

function addDepartments () {
  inquirer.prompt(addDepartmentsQuestion).then((response) => {
  let sql = "INSERT INTO departments (name) VALUES (?)";
  db.query(sql, response.name, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    console.log("Added to database")
    init();
  })
  });
}

function addRoles () {
  inquirer.prompt(addRolesQuestion).then((response) => {
    let sql = "INSERT INTO roles (title, department_id, salary) VALUES (?,?,?)";
    const params = [
      response.title,
      response.department_id,
      response.salary
    ];
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
      console.log("Updated roles")
      init();
    })
    });
}

function addEmployees () {
  inquirer.prompt(addEmployeesQuestion).then((response) => {
    let sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    const params = [
      response.first_name,
      response.last_name,
      response.role_id,
      response.manager_id
    ];
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log(err);
      } 
      console.table(rows);
      console.log("Added new employee")
      init();
    })
  });
}

function updateEmployees () {
  inquirer.prompt(updateEmployeesQuestion).then((response) => {
    let sql = "UPDATE employees SET role_id = ? WHERE id = ?";
    const params = [
      response.role_id,
      response.id,
      ];
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log(err);
      } 
      console.table(rows);
      console.log("Updated employee")
      init();
    })
  });
}