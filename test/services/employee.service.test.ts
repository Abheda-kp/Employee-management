import {mock,MockProxy} from 'jest-mock-extended'
import {when} from 'jest-when'
import { send } from 'process';
import Employee from '../../entities/employee.entity';
import { EmployeeRepository } from '../../repositories/employee.repositories';
import { EmployeeService } from '../../services/employee.service';
import { serialize } from 'v8';
import { departmentService } from '../../routes/department.route';

describe('EmployeeService',()=>{
    let employeeRepository:MockProxy<EmployeeRepository>;
    let employeeService:EmployeeService;
    beforeEach(()=>{
        employeeRepository=mock<EmployeeRepository>();
        employeeService=new EmployeeService(employeeRepository,departmentService)
    });

    describe('getEmployeeById',()=>{
          it("get employee when id is present",async()=>{
                 //Arrange
                 const mockEmployee={id:123,name:"Employee Name"} as Employee;
                 when(employeeRepository.findById).calledWith(1).mockReturnValue(mockEmployee);    //it says when 1 is called return mockEmployee,no connection with id inside mockemployee
                 const user=await  employeeService.getEmployeeById(1);
                 expect(employeeRepository.findById).toHaveBeenCalledWith(1);
                 expect(user).toStrictEqual(mockEmployee);               

          })
          it("should throw error when user with provided  id does not exist",async()=>{
            //Arrange
               when(employeeRepository.findById).calledWith(1).mockReturnValue(null);
               //Act
               expect(employeeService.getEmployeeById(2)).rejects.toThrow("Employee not found");

               //Assert
               expect(employeeRepository.findById).toHaveBeenCalledWith(2)
          })
    })
})