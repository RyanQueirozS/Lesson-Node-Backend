import { ErrorHandler } from '@src/shared/utils/error-handlers/ErrorHandler';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: any, req: Request, response: Response, next: NextFunction) => {
    if(error instanceof ErrorHandler){
        return error.messageToClient(response)
    }

    return response.status(500).json({error: 'Internal server error'})
}
