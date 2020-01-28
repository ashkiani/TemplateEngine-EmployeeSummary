const validation = require("../lib/validation");
const Employee = require("../lib/employee");
const Validator = new validation();
class Manager extends Employee {
    constructor(name, id, title, email, officeNumber) {

        super(name, id, title, email);
        this._role = "Manager";
        if (Validator.isIdValid(officeNumber)) {
            this.officeNumber = officeNumber;
        } else {
            throw new Error(Validator.invalidOfficeNumberMessage());
        }
    }
    //Siavash 1/28/2020 Overriding the following method is completely unnecessary and we can safely remove it. The classes are already setup such that the _role value will be updated in the constructor. 
    //I’m overriding this method just because it's the assignment requirement
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;