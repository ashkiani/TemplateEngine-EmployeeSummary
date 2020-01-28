const validation = require("../lib/validation");
const Validator = new validation();

class Employee {
    constructor(name, id, title, email) {
        if (Validator.isNameValid(name)) {
            this.name = name;
        } else {
            throw new Error(Validator.invalidNameMessage());
        }

        if (Validator.isIdValid(id)) {
            this.id = id;
        } else {
            throw new Error(Validator.invalidIdMessage());
        }

        if (Validator.isNameValid(title)) {
            this.title = title;
        } else {
            throw new Error(Validator.invalidTitleMessage());
        }
        if (Validator.isEmailValid(email)) {
            this.email = email;
        } else {
            throw new Error(Validator.invalidEmailMessage());
        }

        this._role = "Employee";
    }
    getRole() {
        return this._role;
    }
}

Employee.prototype.getName=function() {
    return this.name;
}
Employee.prototype. getID=function() {
    return this.id;
}
Employee.prototype.getTitle=function(){
    return this.title;
}
Employee.prototype.getEmail=function() {
    return this.email;
}

module.exports = Employee;