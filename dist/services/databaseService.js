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
exports.saveReading = exports.verificarLeituraExistente = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const readingModel_1 = __importDefault(require("../models/readingModel"));
mongoose_1.default.connect('STring de conexão do MOngo_db')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));
const verificarLeituraExistente = (userId, readingType, month) => __awaiter(void 0, void 0, void 0, function* () {
    const startOfMonth = new Date(new Date().getFullYear(), month, 1);
    const endOfMonth = new Date(new Date().getFullYear(), month + 1, 0);
    return yield readingModel_1.default.findOne({
        userId,
        readingType,
        timeStamp: {
            $gte: startOfMonth,
            $lte: endOfMonth
        }
    });
});
exports.verificarLeituraExistente = verificarLeituraExistente;
const saveReading = (readingData) => __awaiter(void 0, void 0, void 0, function* () {
    const reading = new readingModel_1.default(readingData);
    return yield reading.save();
});
exports.saveReading = saveReading;
