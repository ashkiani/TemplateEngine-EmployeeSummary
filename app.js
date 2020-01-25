const Prompts = require("./lib/prompts");
const inquirer = require('inquirer');
let prompts = new Prompts();

function start() {
    console.log("Starting...");
    const answers = AskTeamQuestions();
}

function getManagerInfo() {
    console.log("Team Manager Information:");
    return inquirer.prompt(prompts.manager)
}

function AskTeamQuestions() {
    
    getManagerInfo().then(managerInfo => {
        console.log(managerInfo);
    });
}

console.log("You will be prompted to build an engineering team. An engineering team consists of a manager, and any number of engineers and interns. ");
inquirer
    .prompt([
        {
            type: "confirm",
            message: "Are you ready to start?",
            name: "start"
        }
    ])
    .then(input => {
        if (input.start) {
            start();
        }
    });