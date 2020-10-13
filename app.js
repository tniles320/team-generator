const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];
const managerList = [];
const engineerList = [];
const internList = [];

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

const addManager = (res) => {
    const managerData = res;
    inquirer.prompt(managerQuestions)
    .then((res) => {
        managerData.officeNumber = res.officeNumber;
        if(res.newEmployee === "Yes"){
            employeeList.push(managerData);
            addEmployee();
        } else {
            employeeList.push(managerData);
            renderEmployeeData(employeeList);
        } 
    });
}

const addEngineer = (res) => {
    const engineerData = res;
    inquirer.prompt(engineerQuestions)
    .then((res) => {
        engineerData.github = res.github;
        if(res.newEmployee === "Yes"){
            employeeList.push(engineerData);
            addEmployee();
        } else {
            employeeList.push(engineerData);
            renderEmployeeData(employeeList);
        } 
    });
}

const addIntern = (res) => {
    const internData = res;
    inquirer.prompt(internQuestions)
    .then((res) => {
        internData.school = res.school;
        if(res.newEmployee === "Yes"){
            employeeList.push(internData);
            addEmployee();
        } else {
            employeeList.push(internData);
            renderEmployeeData(employeeList);
        } 
    });
}

const renderEmployeeData = (employeeList) => {
    employeeList.forEach(findManager)
    employeeList.forEach(findEngineer)
    employeeList.forEach(findIntern)
    console.log(managerList)
    console.log(engineerList)
    console.log(internList)
    // need to create 3 functions that use each list to create new classes for each employee
}

const findManager = (manager) => {
    if(manager.role === "Manager") {
        // creating new classes, need to add to this so it generates html for each new class
        manager.name = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
        // testing to make sure the function is called properly
        console.log(manager.name.getRole());
        // array will probably not be used
        managerList.push(manager)
    }
}

const findEngineer = (engineer) => {
    if(engineer.role === "Engineer") {
        engineerList.push(engineer)
    }
}

const findIntern = (intern) => {
    if(intern.role === "Intern") {
        internList.push(intern)
    }
}



addEmployee();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
