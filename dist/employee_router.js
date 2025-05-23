"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./entities/employee.entity"));
const data_source_1 = __importDefault(require("./db/data-source"));
const employeeRouter = express_1.default.Router();
const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield employeeRepository.find();
    console.log(employees);
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    console.log(empId);
    const employee = yield employeeRepository.findOneBy({ id: empId });
    res.status(200).send(employee);
}));
employeeRouter.post("/", (req, res) => {
    console.log(req.body);
    const newEmployee = new employee_entity_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    employeeRepository.save(newEmployee);
    res.status(201).send(newEmployee);
    // res.status(201).send({message:"operation success"});
});
employeeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    const data = req.body;
    const employee = yield employeeRepository.update(empId, { email: data.email, name: data.name });
    console.log("update employees");
    res.status(200).send(employee);
}));
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    if (yield employeeRepository.existsBy({ id: empId })) {
        yield employeeRepository.delete(empId);
        res.status(200).send("Deleted successfully");
    }
    else {
        res.status(404).send("id not found");
    }
}));
exports.default = employeeRouter;
// let count = 2;
// let employees: Employee[] = [
//   {
//     id: 1,
//     email: "employee1@gmail.com",
//     name: "Employee1",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     email: "employee2@gmail.com",
//     name: "Employee2",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
// employeeRouter.get("/:id", (req, res) => {
//   const empId = Number(req.params["id"]);
//   const employee = employees.find((emp) => emp.id === empId);
//   if (!employee) {
//     res.status(404).send("Employee not found");
//     return;
//   }
//   res.status(200).send(employee);
// });
// employeeRouter.post("/", (req, res) => {
//   console.log(req.body);
//   const newEmployee = new Employee();
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   newEmployee.createdAt = new Date();
//   newEmployee.updatedAt = new Date();
//   newEmployee.id = ++count;
//   employees.push(newEmployee);
//   res.status(200).send(newEmployee);
// });
// employeeRouter.delete("/:id", (req, res) => {
//   const employeeIdxToDelete = employees.findIndex(
//     (emp) => emp.id === Number(req.params["id"]),
//   );
//   employees.splice(employeeIdxToDelete, 1);
//   res.status(200).send();
// });
//# sourceMappingURL=employee_router.js.map