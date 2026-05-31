import type { PainRecord } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';

export const createGetPainRecordByIdService = (repository: PainRecordRepository) => {
    return {
        execute: async (id: string): Promise<PainRecord> => repository.getById(id)
    };
};
