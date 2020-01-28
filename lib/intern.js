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
    getSchool() {
        return this.school;
    }
    //Siavash 1/28/2020 Overriding the following method is completely unnecessary and we can safely remove it. The classes are already setup such that the _role value will be updated in the constructor. 
    //I’m overriding this method just because it's the assignment requirement
    getRole() {
        return "Intern";
    }
}

module.exports = Intern;