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
exports.uploadImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: 'MINHA_CHAVE_DE_ACESSO_AWS',
    secretAccessKey: 'MINHA_CHAVE_SECRETA_AWS',
    region: 'MINHA-REGIÃO_AWS'
});
const uploadImage = (imageBase64) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = Buffer.from(imageBase64, 'base64');
    const imageId = (0, uuid_1.v4)();
    const params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: '${imageId}.jpg',
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    const uploadResult = yield s3.upload(params).promise();
    // Gera a URL temporária e experia em 1 hora
    const url = s3.getSignedUrl('getObject', {
        Bucket: params.Bucket,
        Key: params.Key,
        Expires: 3600 // 1 hora em segundos
    });
    return url;
});
exports.uploadImage = uploadImage;
