import { DatabaseError } from './../types/DatabaseError';
import { handleDataBaseErrors } from './../utils/handle-database-error';
import { isPrismaError } from './../utils/is-prisma-error.util';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataBaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(error => {
                if (isPrismaError(error)) {
                    error = handleDataBaseErrors(error);
                }
                if (error instanceof DatabaseError) {
                    throw new BadRequestException(error.message);
                } else {
                    throw error;
                }
            }),
        );
    }
}
