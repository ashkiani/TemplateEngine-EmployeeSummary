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
    getName() {
        return this.name;
    }
    getID() {
        return this.id;
    }
    getTitle(){
        return this.title;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this._role;
    }
}

module.exports = Employee;