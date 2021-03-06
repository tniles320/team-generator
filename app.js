const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// variables that store the output directory and html file name
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// render function from html file
const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is this employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is this employee's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this employee's email?"
    },
    {
        type: "list",
        name: "role",
        message: "What role does this employee have?",
        choices: ["Manager", "Engineer", "Intern"]
    },
]

const managerQuestions = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is this manager's office number?",
    },
    {
        type: "list",
        name: "newEmployee",
        message: "Do you want to add another employee?",
        choices: ["Yes", "No"]
    },
]

const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "What is this engineer's GitHub username?",
    },
    {
        type: "list",
        name: "newEmployee",
        message: "Do you want to add another employee?",
        choices: ["Yes", "No"]
    },
]

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "What school does this intern attend?",
    },
    {
        type: "list",
        name: "newEmployee",
        message: "Do you want to add another employee?",
        choices: ["Yes", "No"]
    },
]

// prompts user with questions then prompts more questions based off answers
const addEmployee = () => {
    inquirer.prompt(employeeQuestions)
    .then((res) => {
        if(res.role === "Manager") {
            addManager(res);
        } else if(res.role === "Engineer") {
            addEngineer(res);
        } else {
            addIntern(res);
        }
    });
}

// prompts user with manager question, creates new manager class, and pushes class to employees array
const addManager = (res) => {
    const managerData = res;
    inquirer.prompt(managerQuestions)
    .then((res) => {
        managerData.officeNumber = res.officeNumber;
        const newTeamMember = new Manager(`${managerData.name}`, `${managerData.id}`, `${managerData.email}`, `${managerData.officeNumber}`);
        if(res.newEmployee === "Yes"){
            employees.push(newTeamMember);
            addEmployee();
        } else {
            employees.push(newTeamMember);
            writeFile(employees);
        } 
    });
}

// prompts user with engineer question, creates new engineer class, and pushes class to employees array
const addEngineer = (res) => {
    const engineerData = res;
    inquirer.prompt(engineerQuestions)
    .then((res) => {
        engineerData.github = res.github;
        const newTeamMember = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        if(res.newEmployee === "Yes"){
            employees.push(newTeamMember);
            addEmployee();
        } else {
            employees.push(newTeamMember);
            writeFile(employees);
        } 
    });
}

// prompts user with intern question, creates new intern class, and pushes class to employees array
const addIntern = (res) => {
    const internData = res;
    inquirer.prompt(internQuestions)
    .then((res) => {
        internData.school = res.school;
        const newTeamMember = new Intern(internData.name, internData.id, internData.email, internData.school);
        if(res.newEmployee === "Yes"){
            employees.push(newTeamMember);
            addEmployee();
        } else {
            employees.push(newTeamMember);
            writeFile(employees);
        } 
    });
}

// writes team.html file to output directory
const writeFile = employees => {
    return fs.writeFileSync(outputPath, render(employees));
}

addEmployee();