"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const httpException_1 = require("../exception/httpException");
const logger_service_1 = require("../services/logger.service");
const logger = logger_service_1.LoggerService.getInstance('app()');
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof httpException_1.HttpException) {
            const status = error.status || 500;
            const message = error.message || "Something went wrong";
            let respbody = { message: message };
            res.status(status).json(respbody);
            logger.error(`$(error.status) $(error.message)`);
        }
        else {
            logger.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map