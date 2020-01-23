const Manager = require("../lib/manager");
const validation = require("../lib/validation");
const Validator = new validation();

function generateManagerObject(mngrParameters) {
    return new Manager(mngrParameters.name, mngrParameters.id, mngrParameters.title, mngrParameters.email,mngrParameters.officeNumber);
}

describe("Manager", () => {
    const validData = { "name": "Test Name", "id": 1, "title": "Tester", "email": "test@testers.com", "officeNumber": 1 };
    const invalidData = { "name": "", "id": "", "title": "", "email": "", "officeNumber": "" };

    describe("Initialization", () => {
        it("should create an object with a name, id, title and email if provided valid arguments", () => {
            const obj = generateManagerObject(validData);
            expect(obj.name).toEqual(validData.name);
            expect(obj.id).toEqual(validData.id);
            expect(obj.title).toEqual(validData.title);
            expect(obj.email).toEqual(validData.email);
            expect(obj.officeNumber).toEqual(validData.officeNumber);
        });

        it("should throw an error if not provided a name", () => {
            // Arrange
            const cb = () => generateManagerObject(invalidData);
            const err = new Error(Validator.invalidNameMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a id", () => {
            // Arrange
            const cb = () => new Manager(validData.name, invalidData.id, validData.title, validData.email,validData.officeNumber);
            const err = new Error(Validator.invalidIdMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a title", () => {
            // Arrange
            const cb = () => new Manager(validData.name, validData.id, invalidData.title, validData.email,validData.officeNumber);
            const err = new Error(Validator.invalidTitleMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a valid email address", () => {
            // Arrange
            const cb = () => new Manager(validData.name, validData.id, validData.title, invalidData.email,validData.officeNumber);
            const err = new Error(Validator.invalidEmailMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
        
        it("should throw an error if not provided a valid office number", () => {
            // Arrange
            const cb = () => new Manager(validData.name, validData.id, validData.title, validData.email, invalidData.officeNumber);
            const err = new Error(Validator.invalidOfficeNumberMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
    });

    describe("methods", () => {
        it("should return the manager name", () => {
            const obj = generateManagerObject(validData);
            expect(obj.getName()).toEqual(validData.name);
        });
        it("should return the manager ID", () => {
            const obj = generateManagerObject(validData);
            expect(obj.getID()).toEqual(validData.id);
        });
        it("should return the manager title", () => {
            const obj = generateManagerObject(validData);
            expect(obj.getTitle()).toEqual(validData.title);
        });
        it("should return the manager email", () => {
            const obj = generateManagerObject(validData);
            expect(obj.getEmail()).toEqual(validData.email);
        });
        it("should return the manager role", () => {
            const obj = generateManagerObject(validData);
            expect(obj.getRole()).toEqual("Manager");
        });
    });


});