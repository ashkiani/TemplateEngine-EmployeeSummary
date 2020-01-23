const Employee = require("../lib/employee");

describe("Employee", () => {
    describe("Initialization", () => {
        it("should create an object with a name, id and title if provided valid arguments", () => {
            const name = "Test Name";
            const id = 1;
            const title = "Tester";
            const obj = new Employee(name, id, title);
            expect(obj.name).toEqual(name);
            expect(obj.id).toEqual(id);
            expect(obj.title).toEqual(title);
        });

        it("should throw an error if not provided a name", () => {
            // Arrange
            const err = new Error(
                "Expected parameter 'name' to be a non empty string"
            );

            // Assert
            expect(new Employee("", 1, "Tester")).toThrowError(err);
        });
        
    });

    // describe("another feature", () => {
    //     it("should ...", () => {
            
    //     });
    // });

    
});
