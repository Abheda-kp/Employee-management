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
exports.logger = void 0;
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = __importDefault(require("./middlewares/loggerMiddleware"));
const processTimeMiddleware_1 = require("./middlewares/processTimeMiddleware");
const data_source_1 = __importDefault(require("./db/data-source"));
const employee_route_1 = __importDefault(require("./routes/employee.route"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const logger_service_1 = require("./services/logger.service");
const department_route_1 = __importDefault(require("./routes/department.route"));
//import DepartmentRou
//const {Client}=require('pg');
const server = (0, express_1.default)();
exports.logger = logger_service_1.LoggerService.getInstance('app()');
server.use(express_1.default.json());
server.use(loggerMiddleware_1.default);
server.use(processTimeMiddleware_1.processTimeMiddleware);
server.use("/employees", employee_route_1.default);
server.use("/department", department_route_1.default);
server.use("/auth", auth_route_1.default);
server.use(errorMiddleware_1.errorMiddleware);
server.get("/", (req, res) => {
    res.status(200).send("Hello world");
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.default.initialize();
        exports.logger.info("Database connected");
        server.listen(3001, () => {
            exports.logger.info("server listening to 3001");
        });
    }
    catch (e) {
        exports.logger.error(`Failed to connect to DB- ${e}`);
        process.exit(1);
    }
}))();
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
//# sourceMappingURL=app.js.map