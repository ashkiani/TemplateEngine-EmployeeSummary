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
}

module.exports = Manager;