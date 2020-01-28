const Prompts = require("./lib/prompts");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require('inquirer');
let prompts = new Prompts();
require('events').EventEmitter.defaultMaxListeners = 15;

let team = [];
function start() {
    console.log("Starting...");
    team = [];
    const answers = AskTeamQuestions();
}

function getManagerInfo() {
    console.log("Team Manager Information:");
    return getMemberInfo("Manager");
}

function getMemberInfo(role) {
    let memberPrompts;
    switch (role) {
        case "Manager":
            memberPrompts = prompts.manager;
            break;
        case "engineer":
            memberPrompts = prompts.engineer;
            break;
        case "intern":
            memberPrompts = prompts.intern;
            break;
        default:

    }
    return inquirer.prompt(memberPrompts);
}

async function AskTeamMemberInfo() {
    return inquirer.prompt(prompts.memberType).then(async function (mtAnswer) {
        await getMemberInfo(mtAnswer.memberType).then(mInfoAnswer => {
            switch (mtAnswer.memberType) {
                case "engineer":
                    let eng = new Engineer(mInfoAnswer.name, mInfoAnswer.empId, "Engineer", mInfoAnswer.email, mInfoAnswer.gitHub);
                    team.push(eng);
                    break;
                case "intern":
                    let int = new Intern(mInfoAnswer.name, mInfoAnswer.empId, "Intern", mInfoAnswer.email, mInfoAnswer.school);
                    team.push(int);
                    break;
                default:

            }
        });
    });
}
async function AskTeamQuestions() {

    getManagerInfo().then(managerInfo => {

        let manager = new Manager(managerInfo.name, parseInt(managerInfo.empId), "Manager", managerInfo.email, managerInfo.officeNumber);
        team.push(manager);

        inquirer.prompt([{
            type: "number",
            message: "How many people work for the manager in this project?",
            name: "headCount"
        }]).then(async function (response) {
            for (let i = 0; i < response.headCount; i++) {
                await AskTeamMemberInfo();
            }
            //console.log(team);
        });
    });
}

console.log("You will be prompted to build an engineering team. An engineering team consists of a manager, and any number of engineers and interns. ");
console.log("---");
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