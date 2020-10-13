const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    };
    getOfficeNumber() {
        return this.officeNumber;
    }
}

const e = new Manager("Foo", 1, "test@test.com", 100);

e.getRole();
e.getOfficeNumber();

module.exports = Manager;