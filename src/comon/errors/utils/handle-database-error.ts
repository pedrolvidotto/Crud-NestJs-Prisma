import { DatabaseError } from './../types/DatabaseError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';
import { PrismaClientError } from './../types/PrismaClientError';
enum PrismaErrors {
    UniqueConstraintFail = 'P2002',
}

export const handleDataBaseErrors = (e: PrismaClientError): Error => {
    switch (e.code) {
        case PrismaErrors.UniqueConstraintFail:
            return new UniqueConstraintError(e);

        default:
            return new DatabaseError(e.message);
    }
};
