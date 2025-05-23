import express from 'express';
import Department from '../entities/department.entity';
import { DepartmentRepository } from '../repositories/department.repositories';
import datasource from '../db/data-source';
import { DepartmentController } from '../controllers/department.controller';
import { DepartmentService } from '../services/department.service';

const departmentRouter=express.Router()

const departmentRepository=new DepartmentRepository(datasource.getRepository(Department))
const departmentService=new DepartmentService(departmentRepository);
const employeeController=new DepartmentController(departmentService,departmentRouter)

export default departmentRouter
export {departmentService}