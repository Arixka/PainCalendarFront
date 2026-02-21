import { createPainRecord, type PainRecord } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';

export type CreatePainRecordRequest = {
    readonly intensity: number;
    readonly location: string;
    readonly date: Date;
};

export const createPainRecordService = (repository: PainRecordRepository) => {
    return {
        execute: async (request: CreatePainRecordRequest): Promise<PainRecord> => {
            const record = createPainRecord({
                id: crypto.randomUUID(),
                date: request.date,
                intensity: request.intensity,
                location: request.location,
            });

            await repository.save(record);

            return record;
        }
    };
};
