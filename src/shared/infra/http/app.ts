import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express'; // Biblioteca de documentação de API

import 'reflect-metadata'; // Dependência do typeorm e do TSyringe
import '@shared/container'; // Container do TSyringe

import upload from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm'; // Conexão com banco de dados

import swaggerFile from '../../../swagger.json'; // Arquivo de setup do swagger
import { routes } from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ error: error.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    });
  }
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Integrar swagger

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

export { app };
