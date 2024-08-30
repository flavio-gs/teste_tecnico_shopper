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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const uploadValidator_1 = require("../validators/uploadValidator");
const databaseService_1 = require("../services/databaseService");
const storageService_1 = require("../services/storageService");
const geminiService_1 = require("../services/geminiService");
const uuid_1 = require("uuid");
const uploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = uploadValidator_1.uploadSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { imageBase64, readingType, userId, timeStamp } = value;
        const currentMonth = new Date().getMonth();
        const existingReading = yield (0, databaseService_1.verificarLeituraExistente)(userId, readingType, currentMonth);
        if (existingReading) {
            return res.status(409).json({ message: 'Já existe registro nesse mês' });
        }
        const extrairValor = yield (0, geminiService_1.extrairValordaImagem)(imageBase64);
        if (extrairValor === null) {
            return res.status(422).json({ message: 'Não foi possível extrair o valor da imagem.' });
        }
        const imageUrl = yield (0, storageService_1.uploadImage)(imageBase64);
        const readingId = (0, uuid_1.v4)();
        const newReading = {
            id: readingId,
            userId,
            readingType,
            value: extrairValor,
            imageUrl,
            timeStamp: timeStamp || new Date()
        };
        const savedReading = yield (0, databaseService_1.saveReading)(newReading);
        return res.status(201).json({
            id: savedReading.id,
            imageUrl: savedReading.imageUrl,
            value: savedReading.value
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do Servidor' });
    }
});
exports.uploadController = uploadController;
