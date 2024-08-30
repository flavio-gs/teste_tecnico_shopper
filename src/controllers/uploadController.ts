import { Request, Response } from "express";
import { uploadSchema } from "../validators/uploadValidator";
import { verificarLeituraExistente, saveReading } from "../services/databaseService";
import { uploadImage } from "../services/storageService";
import { extrairValordaImagem } from "../services/geminiService";
import { v4 as uuidv4 } from "uuid";
import { NewReading } from "../models/readingModel";


export const uploadController = async (req: Request, res: Response) =>{

    try{
        const {error, value} = uploadSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message});
        }

        const {imageBase64, readingType, userId, timeStamp} = value;

        const currentMonth = new Date().getMonth();
        const existingReading = await verificarLeituraExistente(userId, readingType, currentMonth);

        if(existingReading){
            return res.status(409).json({ message: 'Já existe registro nesse mês'});
        }

        const extrairValor = await extrairValordaImagem(imageBase64);

        if(extrairValor === null){
            return res.status(422).json({message: 'Não foi possível extrair o valor da imagem.'})
        }

        const imageUrl = await uploadImage(imageBase64);

        const readingId = uuidv4();

        const newReading: NewReading = {
            id: readingId,
            userId,
            readingType,
            value: extrairValor,
            imageUrl,
            timeStamp: timeStamp || new Date()
        };

        const savedReading = await saveReading(newReading)

        return res.status(201).json({
            id: savedReading.id,
            imageUrl: savedReading.imageUrl,
            value: savedReading.value
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Erro interno do Servidor'});
    }
};