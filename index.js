#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    balance;
    course;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.balance = 5000;
        this.course = [];
    }
    enroll_courses(course) {
        this.course.push(course);
    }
    view_balance() {
        console.log(chalk.bold.italic.yellow(`Balance for ${this.name} : ${this.balance}`));
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.bold.italic.yellow(`${amount}: fees paid successfully for: ${this.name}`));
        console.log(chalk.bold.italic.red(`Remainig Balance : ${this.balance}`));
    }
    show_status() {
        console.log(chalk.bold.italic.blueBright(`ID : ${this.id}`));
        console.log(chalk.bold.italic.blueBright(`Name : ${this.name}`));
        console.log(chalk.bold.italic.blueBright(`Balance : ${this.balance}`));
        console.log(chalk.bold.italic.blueBright(`Course : ${this.course}`));
    }
}
class Student_maneger {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold.italic.yellow(`Student : ${name} added successfully . student ID : ${student.id}`));
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_courses(course);
            console.log(chalk.bold.italic.yellow(`${student.name} enrolled in ${course} successfully`));
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.bold.italic.redBright(`student not found .Please enter a correct student ID`));
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.bold.italic.redBright(`student not found .Please enter a correct student ID`));
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run program
async function main() {
    console.log(chalk.bold.italic.blue.bgWhite(`\n\n==================WELCOME=================`));
    console.log(chalk.bold.italic.red(`\nCODE WITH KOMAL - STUDENT MANEGMENT SYSTEM\n`));
    console.log(chalk.bold.italic.white(`=`.repeat(50)));
    let student_maneger = new Student_maneger();
    while (true) {
        let choise = await inquirer.prompt([
            {
                name: 'choise',
                type: "list",
                message: "select an option",
                choices: [
                    'ADD STUDENT',
                    'ENROLL STUDENT',
                    'VIEW STUDENT BALANCE',
                    'PAY FEES',
                    'SHOW STATUS',
                    'EXIT',
                ]
            }
        ]);
        switch (choise.choise) {
            case 'ADD STUDENT':
                let name_input = await inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: (chalk.bold.italic.magenta("ENTER A STUDENT NAME : ")),
                    }
                ]);
                student_maneger.add_student(name_input.name);
                break;
            case 'ENROLL STUDENT':
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.italic.magenta("ENTER A STUDENT ID : "))
                    },
                    {
                        name: 'course',
                        type: "input",
                        message: chalk.bold.italic.magenta(("ENTER A COURSE NAME : ")),
                    }
                ]);
                student_maneger.enroll_student(course_input.student_id, course_input.course);
                break;
            case 'VIEW STUDENT BALANCE':
                let balance_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: "number",
                        message: (chalk.bold.italic.magenta("ENTER A STUDENT ID"))
                    }
                ]);
                student_maneger.view_student_balance(balance_input.student_id);
                break;
            case "PAY FEES":
                let fees_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: "number",
                        message: (chalk.bold.italic.magenta('ENTER A STUDENT ID'))
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: (chalk.bold.italic.magenta("ENTER AMOUNT TO PAY FEES :")),
                    }
                ]);
                student_maneger.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "SHOW STATUS":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.italic.magenta("ENTER A STUDENT ID"))
                    }
                ]);
                student_maneger.show_student_status(status_input.student_id);
                break;
            case "EXIT":
                console.log(chalk.bold.italic.cyanBright(`EXITING...`));
                process.exit();
        }
    }
}
main();
