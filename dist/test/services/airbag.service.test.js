"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const airbag_service_1 = require("../../services/airbag.service");
const jest_mock_extended_1 = require("jest-mock-extended");
const jest_when_1 = require("jest-when");
describe('AirbagService', () => {
    let sensorMock;
    let igniterMock;
    let service;
    beforeEach(() => {
        sensorMock = (0, jest_mock_extended_1.mock)();
        igniterMock = (0, jest_mock_extended_1.mock)();
        service = new airbag_service_1.AirbagService(sensorMock, igniterMock);
    });
    it('deploys the airbag when a crash is detected', () => {
        //Arrange
        (0, jest_when_1.when)(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);
        //Act
        const result = service.deployAirbag();
        //Assert
        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).toHaveBeenCalledWith(100, 50);
    });
    it('does not deploy the airbag when no crash is detected', () => {
        //Arrange
        (0, jest_when_1.when)(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);
        //Act
        const result = service.deployAirbag();
        //Assert
        expect(result).toEqual({ triggered: false });
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=airbag.service.test.js.map