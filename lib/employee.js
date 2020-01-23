class Employee {
    constructor(name,id,title){
        //throw new Error("Expected parameter 'name' to be a non empty string");
        this.name=name;
        this.id=id;
        this.title=title;
        this._role ="Employee";
    }
    getName(){
        return this.name;
    }
    getID(){
        return this.id;
    }
    getEmail(){

    }
    getRole(){

    }
}

module.exports = Employee;