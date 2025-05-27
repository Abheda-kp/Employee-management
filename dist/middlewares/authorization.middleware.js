"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const httpException_1 = require("../exception/httpException");
const authorizationMiddleware = (role) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!role.includes(userRole)) {
            throw new httpException_1.HttpException(403, "User has no privilege to access the resource");
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization.middleware.js.map