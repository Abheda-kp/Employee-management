import { DepartmentService } from "../services/department.service";
import Department, { EmployeeRole } from "../entities/employee.entity";
import { Request, Response, Router, NextFunction } from "express";
import { DepartmentRepository } from "../repositories/department.repositories";
import { errorMiddleware } from "../middlewares/errorMiddleware";
import { HttpException } from "../exception/httpException";
import { plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/department.dto";
import { UpdateDepartmentDto } from "../dto/updateDept.dto";
import { validate } from "class-validator";
import { logger } from "../app";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
export class DepartmentController {
  constructor(private departmentService: DepartmentService, router: Router) {
    router.post("/", authorizationMiddleware([EmployeeRole.HR,EmployeeRole.DEVELOPER]),this.createDepartment.bind(this));
    router.get("/", this.getAllDepartment.bind(this));
    router.get("/:id", this.getDepartmentById.bind(this));
    router.put("/:id", authorizationMiddleware([EmployeeRole.HR,EmployeeRole.DEVELOPER]),this.updateById); //arrow function
    router.delete("/:id", authorizationMiddleware([EmployeeRole.HR,EmployeeRole.DEVELOPER]),this.deleteById.bind(this)); //can use arrow function also
    router.get("/:id/emp", this.getEmployeeByDepartmentId.bind(this));
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedDept = await this.departmentService.createDepartment(
        createDepartmentDto.departmentName
      );
      res.status(201).send(savedDept);
    } catch (error) {
      next(error);
    }
  }

  async getAllDepartment(req: Request, res: Response) {
    const employee = await this.departmentService.getAllDepartment();
    res.status(200).send(employee);
  }

  async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const employee = await this.departmentService.getDepartmentById(id);
      if (!employee) {
        throw new HttpException(404, "Dept not found");
      }
      res.status(200).send(employee);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getEmployeeByDepartmentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const employee = await this.departmentService.getEmployeebyDeptId(id);
      if (!employee) {
        throw new HttpException(404, "Dept not found");
      }

      res.status(200).send(employee);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  updateById = async (req: Request, res: Response) => {
    const updateDepartmentDto = plainToInstance(UpdateDepartmentDto, req.body);
    const errors = await validate(updateDepartmentDto);
    if (errors.length > 0) {
      console.log(JSON.stringify(errors));
      throw new HttpException(400, JSON.stringify(errors));
    }
    const id = Number(req.params.id);

    await this.departmentService.updateDepartment(id, updateDepartmentDto);
    res.status(200).send("Updated");
  };

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await this.departmentService.deleteDepartment(id);
      res.status(200).send("Department deleted");
    } catch (err) {
      logger.warn("Cannot delete the department");

      next(err);
    }
  }
  async deleteBySoftRemove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.departmentService.softRemove(id);
    res.status(200).send();
  }
}
