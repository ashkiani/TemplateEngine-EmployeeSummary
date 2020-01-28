const Intern = require("../lib/intern");
const validation = require("../lib/validation");
const Validator = new validation();

function generateInternObject(internParameters) {
    return new Intern(internParameters.name, internParameters.id, internParameters.title, internParameters.email,internParameters.school);
}

describe("Intern", () => {
    const validData = { "name": "Test Name", "id": 1, "title": "Tester", "email": "test@testers.com", "school": "testS" };
    const invalidData = { "name": "", "id": "", "title": "", "email": "", "school": "" };

    describe("Initialization", () => {
        it("should create an object with a name, id, title and email if provided valid arguments", () => {
            const obj = generateInternObject(validData);
            expect(obj.name).toEqual(validData.name);
            expect(obj.id).toEqual(validData.id);
            expect(obj.title).toEqual(validData.title);
            expect(obj.email).toEqual(validData.email);
            expect(obj.school).toEqual(validData.school);
        });

        it("should throw an error if not provided a name", () => {
            // Arrange
            const cb = () => generateInternObject(invalidData);
            const err = new Error(Validator.invalidNameMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a id", () => {
            // Arrange
            const cb = () => new Intern(validData.name, invalidData.id, validData.title, validData.email,validData.school);
            const err = new Error(Validator.invalidIdMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a title", () => {
            // Arrange
            const cb = () => new Intern(validData.name, validData.id, invalidData.title, validData.email,validData.school);
            const err = new Error(Validator.invalidTitleMessage());
            // Assert
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided a valid email address", () => {
            // Arrange
            const cb = () => new Intern(validData.name, validData.id, validData.title, invalidData.email,validData.school);
            const err = new Error(Validator.invalidEmailMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
        
        it("should throw an error if not provided a valid office number", () => {
            // Arrange
            const cb = () => new Intern(validData.name, validData.id, validData.title, validData.email, invalidData.school);
            const err = new Error(Validator.invalidSchoolMessage());
            // Assert
            expect(cb).toThrowError(err);
        });
    });

    describe("methods", () => {
        it("should return the Intern name", () => {
            const obj = generateInternObject(validData);
            expect(obj.getName()).toEqual(validData.name);
        });
        it("should return the Intern ID", () => {
            const obj = generateInternObject(validData);
            expect(obj.getID()).toEqual(validData.id);
        });
        it("should return the Intern title", () => {
            const obj = generateInternObject(validData);
            expect(obj.getTitle()).toEqual(validData.title);
        });
        it("should return the Intern email", () => {
            const obj = generateInternObject(validData);
            expect(obj.getEmail()).toEqual(validData.email);
        });
        it("should return the school", () => {
            const obj = generateInternObject(validData);
            expect(obj.getSchool()).toEqual(validData.school);
        });
        it("should return the Intern role", () => {
            const obj = generateInternObject(validData);
            expect(obj.getRole()).toEqual("Intern");
        });
    });


});