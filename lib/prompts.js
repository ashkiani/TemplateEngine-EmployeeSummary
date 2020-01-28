class Prompts {
    constructor() {
        this.name = { type: "input", message: "Enter Name:", name: "name" };
        this.id = { type: "input", message: "Enter Employee ID:", name: "empId" };
        this.title = { type: "input", message: "Enter Title:", name: "title" };
        this.email = { type: "input", message: "Enter Email:", name: "email" };
        this.officeNumber = { type: "input", message: "Enter Office Number:", name: "officeNumber" };
        this.gitHub = { type: "input", message: "Enter GitHub username:", name: "gitHub" };
        this.school = { type: "input", message: "Enter School name:", name: "school" };
        this.memberType = [{
            type: 'list',
            name: 'memberType',
            message: 'What is the employee type?',
            choices: ['Engineer', 'Intern'],
            filter: function (val) {
                return val.toLowerCase();
            }

        }]

        this.manager = [this.name, this.id, this.email, this.officeNumber];
        this.engineer = [this.name, this.id, this.email, this.gitHub];
        this.intern = [this.name, this.id, this.email, this.school];

    }
}

module.exports = Prompts;