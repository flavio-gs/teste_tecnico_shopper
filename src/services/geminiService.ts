import axios from "axios";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const extrairValordaImagem = async (imageBase64: string): Promise<number | null> => {
    try {
        const response = await axios.post(
            `${GoogleGenerativeAI}?key=${genAI}`, // Inclua a chave na URL
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
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extrair o valor do texto retornado
        const extractedText = response.data.responses[0]?.fullTextAnnotation?.text;
        const value = parseFloat(extractedText?.match(/\d+(\.\d+)?/)[0]); // Supondo que o texto contenha um número
        return value || null;

    } catch (error) {
        console.error('Erro ao consultar a API do Gemini', error);
        return null;
    }
};