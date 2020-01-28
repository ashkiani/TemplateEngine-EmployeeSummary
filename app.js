const Prompts = require("./lib/prompts");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require('inquirer');
var fs = require("fs");

let prompts = new Prompts();
//Siavash 1/28/2020 Added the following code to suppress the MaxListenersExceeded warning. 
//I assume that the warning eventually reappears if the number of team members grows but I tested it with up to 8 team members and worked fine.
require('events').EventEmitter.defaultMaxListeners = 25;

let team = [];
function start() {
    console.log("Starting...");
    team = [];
    AskTeamQuestions();
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
    let members = [];
    team.forEach(member => {
        switch (member.getRole()) {
            case "Manager":
                let htmlManagerData = fs.readFileSync("./templates/manager.html");
                let htmlManagerText = htmlManagerData.toString();
                htmlManagerText = htmlManagerText.replace("--managerName--", member.name);
                htmlManagerText = htmlManagerText.replace("--role--", member.getRole());
                htmlManagerText = htmlManagerText.replace("--id--", member.id);
                htmlManagerText = htmlManagerText.replace("--email--", member.email);
                htmlManagerText = htmlManagerText.replace("--officeNumber--", member.officeNumber);
                htmlTeamText = htmlTeamText.replace("--Manager--", htmlManagerText);
                break;
            case "Engineer":
                let htmlEngineerData = fs.readFileSync("./templates/engineer.html");
                let htmlEngineerText = htmlEngineerData.toString();
                htmlEngineerText = htmlEngineerText.replace("--engineerName--", member.name);
                htmlEngineerText = htmlEngineerText.replace("--role--", member.getRole());
                htmlEngineerText = htmlEngineerText.replace("--id--", member.id);
                htmlEngineerText = htmlEngineerText.replace("--email--", member.email);
                htmlEngineerText = htmlEngineerText.replace("--gitHub--", member.gitHub);
                members.push(htmlEngineerText);
                break;
            case "Intern":
                let htmlInternData = fs.readFileSync("./templates/intern.html");
                let htmlInternText = htmlInternData.toString();
                htmlInternText = htmlInternText.replace("--internName--", member.name);
                htmlInternText = htmlInternText.replace("--role--", member.getRole());
                htmlInternText = htmlInternText.replace("--id--", member.id);
                htmlInternText = htmlInternText.replace("--email--", member.email);
                htmlInternText = htmlInternText.replace("--university--", member.school);
                members.push(htmlInternText);
                break;
            default:
                break;

        }
    });

    //Siavash 1/28/2020 Added the following loop to break the array into smaller chunks. In that way I can control number of rows and columns.
    let membersString = "";
    let i, j, chunk = 3;
    for (i = 0, j = members.length; i < j; i += chunk) {
        let temparray = members.slice(i, i + chunk);
        membersString += '<div class="row">'
        let cols = temparray.map(item => {
            return '<div class="col-4">' + item + '</div>';
        });
        membersString += cols.join("");
        membersString += '</div>'
    }
    htmlTeamText = htmlTeamText.replace("--Team--", membersString);

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