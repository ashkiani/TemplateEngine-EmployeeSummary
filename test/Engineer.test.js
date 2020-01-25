const Engineer = require("../lib/engineer");
const validation = require("../lib/validation");
const Validator = new validation();

function generateEngineerObject(engrParameters) {
    return new Engineer(engrParameters.name, engrParameters.id, engrParameters.title, engrParameters.email,engrParameters.github);
}

describe("Engineer", () => {
    const validData = { "name": "Test Name", "id": 1, "title": "Tester", "email": "test@testers.com", "github": "testG" };
    const invalidData = { "name": "", "id": "", "title": "", "email": "", "github": "" };

    describe("Initialization", () => {
        it("should create an object with a name, id, title and email if provided valid arguments", () => {
            const obj = generateEngineerObject(validData);
            expect(obj.name).toEqual(validData.name);
            expect(obj.id).toEqual(validData.id);
            expect(obj.title).toEqual(validData.title);
            expect(obj.email).toEqual(validData.email);
            expect(obj.github).toEqual(validData.github);
        });

        it("should throw an error if not provided a name", () => {
            // Arrange
            const cb = () => generateEngineerObject(invalidData);
            const err = new Error(Validator.invalidNameMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a id", () => {
            // Arrange
            const cb = () => new Engineer(validData.name, invalidData.id, validData.title, validData.email,validData.github);
            const err = new Error(Validator.invalidIdMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a title", () => {
            // Arrange
            const cb = () => new Engineer(validData.name, validData.id, invalidData.title, validData.email,validData.github);
            const err = new Error(Validator.invalidTitleMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a valid email address", () => {
            // Arrange
            const cb = () => new Engineer(validData.name, validData.id, validData.title, invalidData.email,validData.github);
            const err = new Error(Validator.invalidEmailMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
        
        it("should throw an error if not provided a valid office number", () => {
            // Arrange
            const cb = () => new Engineer(validData.name, validData.id, validData.title, validData.email, invalidData.github);
            const err = new Error(Validator.invalidGitHubMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
    });

    describe("methods", () => {
        it("should return the Engineer name", () => {
            const obj = generateEngineerObject(validData);
            expect(obj.getName()).toEqual(validData.name);
        });
        it("should return the Engineer ID", () => {
            const obj = generateEngineerObject(validData);
            expect(obj.getID()).toEqual(validData.id);
        });
        it("should return the Engineer title", () => {
            const obj = generateEngineerObject(validData);
            expect(obj.getTitle()).toEqual(validData.title);
        });
        it("should return the Engineer email", () => {
            const obj = generateEngineerObject(validData);
            expect(obj.getEmail()).toEqual(validData.email);
        });
        it("should return the Engineer role", () => {
            const obj = generateEngineerObject(validData);
            expect(obj.getRole()).toEqual("Engineer");
        });
    });


});