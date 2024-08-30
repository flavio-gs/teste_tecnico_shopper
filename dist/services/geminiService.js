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
exports.extrairValordaImagem = void 0;
const axios_1 = __importDefault(require("axios"));
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const extrairValordaImagem = (imageBase64) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios_1.default.post(`${GoogleGenerativeAI}?key=${genAI}`, // Inclua a chave na URL
        {
            requests: [
                {
                    image: {
                        content: imageBase64,
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION', // Supondo que você esteja extraindo texto
                            maxResults: 1,
                        },
                    ],
                },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Extrair o valor do texto retornado
        const extractedText = (_b = (_a = response.data.responses[0]) === null || _a === void 0 ? void 0 : _a.fullTextAnnotation) === null || _b === void 0 ? void 0 : _b.text;
        const value = parseFloat(extractedText === null || extractedText === void 0 ? void 0 : extractedText.match(/\d+(\.\d+)?/)[0]); // Supondo que o texto contenha um número
        return value || null;
    }
    catch (error) {
        console.error('Erro ao consultar a API do Gemini', error);
        return null;
    }
});
exports.extrairValordaImagem = extrairValordaImagem;
