import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = `Duplicate key error: ${exception.meta?.target}`;
        break;

      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;

      default:
        this.logger.error(`Unhandled Prisma error: ${exception.message}`);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.code,
    });
  }
}
