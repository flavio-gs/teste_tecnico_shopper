import  express from 'express';
import  uploadRoutes from './routes/uploadRoutes';

const app = express();

app.use(express.json({limit: '10mb'})); // Configuração o limite para o json recebido

app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}')
});