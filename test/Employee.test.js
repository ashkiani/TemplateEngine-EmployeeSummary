const Employee = require("../lib/employee");
const validation = require("../lib/validation");
const Validator = new validation();

function generateEmployeeObject(employeeParameters) {
    return new Employee(employeeParameters.name, employeeParameters.id, employeeParameters.title, employeeParameters.email);
}

describe("Employee", () => {
    const validData = { "name": "Test Name", "id": 1, "title": "Tester", "email": "test@testers.com" };
    const invalidData = { "name": "", "id": "", "title": "", "email": "" };

    describe("Initialization", () => {
        it("should create an object with a name, id, title and email if provided valid arguments", () => {
            const obj = generateEmployeeObject(validData);
            expect(obj.name).toEqual(validData.name);
            expect(obj.id).toEqual(validData.id);
            expect(obj.title).toEqual(validData.title);
            expect(obj.email).toEqual(validData.email);
        });

        it("should throw an error if not provided a name", () => {
            // Arrange
            const cb = () => generateEmployeeObject(invalidData);
            const err = new Error(Validator.invalidStringMessage("name"));
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a id", () => {
            // Arrange
            const cb = () => new Employee(validData.name, invalidData.id, validData.title, validData.email);
            const err = new Error(Validator.invalidIdMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a title", () => {
            // Arrange
            const cb = () => new Employee(validData.name, validData.id, invalidData.title, validData.email);
            const err = new Error(Validator.invalidStringMessage("title"));
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a valid email address", () => {
            // Arrange
            const cb = () => new Employee(validData.name, validData.id, validData.title, invalidData.email);
            const err = new Error(Validator.invalidEmailMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
    });

    describe("methods", () => {
        it("should return the employee name", () => {
            const obj = generateEmployeeObject(validData);
            expect(obj.getName()).toEqual(validData.name);
        });
        it("should return the employee ID", () => {
            const obj = generateEmployeeObject(validData);
            expect(obj.getID()).toEqual(validData.id);
        });
        it("should return the employee title", () => {
            const obj = generateEmployeeObject(validData);
            expect(obj.getTitle()).toEqual(validData.title);
        });
        it("should return the employee email", () => {
            const obj = generateEmployeeObject(validData);
            expect(obj.getEmail()).toEqual(validData.email);
        });
        it("should return the employee role", () => {
            const obj = generateEmployeeObject(validData);
            expect(obj.getRole()).toEqual("Employee");
        });
    });


});
