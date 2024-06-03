import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

/**
 * @see https://www.prisma.io/blog/nestjs-prisma-error-handling-7D056s1kOop2
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
	override catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const message = exception.message.replace(/\n/g, '');

		switch (exception.code) {
			case 'P2002': {
				const status = HttpStatus.CONFLICT;
				response.status(status).json({
					statusCode: status,
					message: message,
				});
				break;
			}
			case 'P2015': {
				const status = HttpStatus.NOT_FOUND;
				response.status(status).json({
					statusCode: status,
					message: message,
				});
				break;
			}
			default: {
				super.catch(exception, host);
				break;
			}
		}
	}
}
