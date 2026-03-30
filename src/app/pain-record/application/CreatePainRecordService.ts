import { createPainRecord, type PainRecord } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';
import type { Slot } from '../domain/Slot';

export type CreatePainRecordRequest = {
    readonly intensity: number;
    readonly slot: Slot;
    readonly location?: string;
    readonly notes?: string;
    readonly date: Date;
};

export const createPainRecordService = (repository: PainRecordRepository) => {
    return {
        execute: async (request: CreatePainRecordRequest): Promise<PainRecord> => {
            const record = createPainRecord({
                id: crypto.randomUUID(),
                date: request.date,
                intensity: request.intensity,
                slot: request.slot,
                location: request.location,
                notes: request.notes,
            });

            await repository.save(record);

            return record;
        }
    };
};
