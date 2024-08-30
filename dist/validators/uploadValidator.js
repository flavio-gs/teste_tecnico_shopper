"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.uploadSchema = joi_1.default.object({
    imageBase64: joi_1.default.string().base64().required(),
    readingType: joi_1.default.string().valid('water', 'gas').required(),
    userId: joi_1.default.string().uuid().required(),
    timeStamp: joi_1.default.date().optional()
});
