const validation = require("../lib/validation");
const Employee = require("../lib/employee");
const Validator = new validation();
class Intern extends Employee {
    constructor(name, id, title, email, school) {

        super(name, id, title, email);
        this._role = "Intern";
        if (Validator.isValidString(school)) {
            this.school = school;
        }
        else {
            throw new Error(Validator.invalidSchoolMessage());
        }
    }

}

module.exports = Intern;