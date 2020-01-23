//Siavash 1/23/2020 Created this class to house validation methods.
class Validation {
    isNameValid(name) {
        return this.isValidString(name);
    }
    isIdValid(id) {
        let isValid = false;
        if (isNaN(id)) {
            //invalid. should be a number
        } else {
            if (id > 0) {
                isValid = true;
            }
        }
        return isValid;
    }
    isTitleValid(title) {
        return this.isValidString(title);
    }

    isEmailValid(email) {
        let isValid = false;
        if (this.isValidString(email)) {
            // returns True if the input is anystring@anystring.anystring, False otherwise
            // Got the code from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            var re = /\S+@\S+\.\S+/;
            isValid = re.test(email);
        }
        return isValid;
    }

    isValidString(str) {
        let isValid = false;
        if (str) {
            if ((str !== "")) {
                isValid = true;
            }
        }
        return isValid;
    }

    invalidStringMessage(varName = "name") {
        return `Invalid '${varName}' parameter. '${varName}' should be a non-empty string.`;
    }
    invalidIdMessage() {
        return "Invalid 'id' parameter. 'id' should be a positive number.";
    }
    invalidEmailMessage() {
        return "Invalid 'email' parameter. 'email' should be in 'anystring@anystring.anystring' format";
    }

}

module.exports = Validation;