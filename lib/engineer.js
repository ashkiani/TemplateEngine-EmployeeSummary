const validation = require("../lib/validation");
const Employee = require("../lib/employee");
const Validator = new validation();
class Engineer extends Employee {
    constructor(name, id, title, email, github) {
        super(name, id, title, email);
        this._role = "Engineer";
        if (Validator.isValidString(github)) {
            this.github = github;
        }
        else {
            throw new Error(Validator.invalidGitHubMessage());
        }
    }
    getGithub() {
        return this.github;
    }
    //Siavash 1/28/2020 Overriding the following method is completely unnecessary and we can safely remove it. The classes are already setup such that the _role value will be updated in the constructor. 
    //I’m overriding this method just because it's the assignment requirement
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;