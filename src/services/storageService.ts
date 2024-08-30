import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
    accessKeyId: 'MINHA_CHAVE_DE_ACESSO_AWS',
    secretAccessKey: 'MINHA_CHAVE_SECRETA_AWS',
    region: 'MINHA-REGIÃO_AWS'
});

export const uploadImage = async (imageBase64: string): Promise<string> => {
    const buffer = Buffer.from(imageBase64, 'base64');
    const imageId = uuidv4();
    const params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: '${imageId}.jpg',
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };

    const uploadResult = await s3.upload(params).promise();

    // Gera a URL temporária e experia em 1 hora
    const url = s3.getSignedUrl('getObject', {
        Bucket: params.Bucket,
        Key: params.Key,
        Expires: 3600 // 1 hora em segundos
    });

    return url;
}