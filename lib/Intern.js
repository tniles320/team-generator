const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}

const e = new Intern("Foo", 1, "test@test.com", "UCLA");

e.getSchool();

module.exports = Intern;