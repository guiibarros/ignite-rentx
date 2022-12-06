import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express'; // Biblioteca de documentação de API

import 'reflect-metadata'; // Dependência do typeorm e do TSyringe
import '@shared/container'; // Container do TSyringe

import upload from '@config/upload';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm'; // Conexão com banco de dados

import swaggerFile from '../../../swagger.json'; // Arquivo de setup do swagger
import { rateLimiter } from './middlewares/rateLimiter';
import { routes } from './routes';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(cors());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Integrar swagger
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(Sentry.Handlers.errorHandler());

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
); // Express async errors

export { app };
