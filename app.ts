import express, { Request, Response } from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import datasource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRouter from "./routes/auth.route";
import authMiddleware from "./middlewares/authMiddleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.route";
import { authorizationMiddleware } from "./middlewares/authorization.middleware";
import { EmployeeRole } from "./entities/employee.entity";
//authMiddleware
//import DepartmentRou
//const {Client}=require('pg');
const server = express();
export const logger=LoggerService.getInstance('app()');
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use("/employees",authMiddleware,employeeRouter);
server.use("/department",authMiddleware,departmentRouter);
server.use("/auth",authRouter)

server.use(errorMiddleware)
server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

(async () =>{
  try{
    await datasource.initialize();
    logger.info("Database connected")
    server.listen(3001, () => {
  logger.info("server listening to 3001");
});
  }

  catch(e){
    logger.error(`Failed to connect to DB- ${e}`);
    process.exit(1);
  }
  
})();



// const dbConfig = {
//   user: 'postgres',
//   password: 'postgres',
//   host: 'localhost',
//   port: '5432',
//   database: 'training',
// };

// const client = new Client(dbConfig);

// client.connect()
//   .then(() => {
//     client.query('SELECT * FROM employee', (err, result) => {
//       if (!err) {
//         console.log('Query result:', result.rows);
//       }
//       client.end();
//     });
//   })
//   .catch((err) => {});

