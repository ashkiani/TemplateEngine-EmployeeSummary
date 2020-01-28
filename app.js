const Prompts = require("./lib/prompts");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require('inquirer');
var fs = require("fs");




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
            generateHtmlDoc();

        });
    });
}

function generateHtmlDoc() {
    let htmlTeamData = fs.readFileSync("./templates/team.html");
    let htmlTeamText = htmlTeamData.toString();
    console.log(team[0]);
    let htmlManageData = fs.readFileSync("./templates/manager.html");
    let htmlManagerText = htmlManageData.toString();
    htmlManagerText = htmlManagerText.replace("--managerName--", team[0].name);
    htmlManagerText = htmlManagerText.replace("--role--", team[0].getRole());
    htmlManagerText = htmlManagerText.replace("--id--", team[0].id);
    htmlManagerText = htmlManagerText.replace("--email--", team[0].email);
    htmlManagerText = htmlManagerText.replace("--officeNumber--", team[0].officeNumber);

    htmlTeamText = htmlTeamText.replace("--Manager--", htmlManagerText);

    fs.writeFileSync("./output/team.html", htmlTeamText);
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