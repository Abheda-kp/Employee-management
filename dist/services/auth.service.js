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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const httpException_1 = require("../exception/httpException");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
class AuthService {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeService.getEmployeeByEmail(email);
            if (!employee) {
                throw new httpException_1.HttpException(404, "No such user exist");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, employee.password);
            if (!isPasswordValid) {
                throw new httpException_1.HttpException(400, "Invalid password");
            }
            const payload = {
                id: employee.id,
                email: employee.email,
                role: employee.role
            };
            const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, { expiresIn: constants_1.JWT_VALIDITY });
            return {
                tokenType: "Bearer",
                accessToken: token
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map