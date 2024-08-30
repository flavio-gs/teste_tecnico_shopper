import Joi from 'joi';

export const uploadSchema = Joi.object({
    imageBase64: Joi.string().base64().required(),
    readingType: Joi.string().valid('water', 'gas').required(),
    userId: Joi.string().uuid().required(),
    timeStamp: Joi.date().optional()
});