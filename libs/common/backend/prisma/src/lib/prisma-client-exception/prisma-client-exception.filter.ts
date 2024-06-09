import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

/**
 * Custom exception filter for handling Prisma client known request errors
 * @see https://www.prisma.io/blog/nestjs-prisma-error-handling-7D056s1kOop2
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {

	/**
	 * handles PrismaClientKnownRequestError exceptions specifically
	 * @param exception
	 * @param host
	 */
	override catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<any>();
		const message = exception.message.replace(/\n/g, '');

		let status = HttpStatus.INTERNAL_SERVER_ERROR;

		if(process.env['DEBUG_MODE'] === 'true') {
			
			status = this.getStatus(exception);

			response.status(status).json({
				statusCode: status,
				message: message,
			});
		}
		else {
			response.status(status).json({
				statusCode: status,
				message: "Internal Server Error"
			});
		}
	}

	/**
	 * determines the HTTP status code based on the PrismaClientKnownRequestError code
	 * @see https://www.prisma.io/docs/orm/reference/error-reference#common
	 * @param exception
	 * @returns {number} HTTP Status code
	 */
	private getStatus(exception: Prisma.PrismaClientKnownRequestError): number {
		switch (exception.code) {
			case 'P1000': {
				return HttpStatus.BAD_REQUEST;
			}
			case 'P2002': {
				return HttpStatus.CONFLICT;
			}
			case 'P2015': {
				return HttpStatus.NOT_FOUND;
			}
			case 'P2025': {
				return HttpStatus.NOT_FOUND;
			}
			default: {
				return HttpStatus.INTERNAL_SERVER_ERROR; // return default 500 error code
			}
		}
	}
}
