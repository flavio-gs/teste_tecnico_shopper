import mongoose from "mongoose";
import readingModel, {NewReading, Reading} from "../models/readingModel";

mongoose.connect('STring de conexão do MOngo_db')
.then(() => console.log('Conectado ao MongoDB'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));


export const verificarLeituraExistente = async (
    userId: string,
    readingType: 'water' | 'gas',
    month: number
): Promise<Reading | null> => {
    
    const startOfMonth = new Date(new Date().getFullYear(), month, 1);
    const endOfMonth = new Date(new Date().getFullYear(), month + 1, 0);

    return await readingModel.findOne({
        userId,
        readingType,
            timeStamp:{
                $gte: startOfMonth,
                $lte: endOfMonth
            }
    });
};

export const saveReading = async (readingData: NewReading ): Promise<Reading> =>{
    const reading = new readingModel(readingData);
    return await reading.save()
}