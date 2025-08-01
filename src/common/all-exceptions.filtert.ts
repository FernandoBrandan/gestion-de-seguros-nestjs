import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        let message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error'

        // En caso que el mensaje venga como objeto, extraemos el mensaje
        if (typeof message === 'object' && (message as any).message) {
            message = (message as any).message
        }

        this.logger.error(
            `HTTP Status: ${status} Error Message: ${JSON.stringify(message)}`,
        )

        response.status(status).json({
            statusCode: status,
            path: request.url,
            error: message,
        })
    }
}
