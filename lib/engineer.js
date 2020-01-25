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

}

module.exports = Engineer;