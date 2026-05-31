import { createPainRecord, type PainRecord } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';
import type { Slot } from '../domain/Slot';

export type UpdatePainRecordRequest = {
    readonly id: string;
    readonly intensity: number;
    readonly slot: Slot;
    readonly location?: string;
    readonly notes?: string;
    readonly date: Date;
};

export const createUpdatePainRecordService = (repository: PainRecordRepository) => {
    return {
        execute: async (request: UpdatePainRecordRequest): Promise<PainRecord> => {
            const record = createPainRecord({
                id: request.id,
                date: request.date,
                intensity: request.intensity,
                slot: request.slot,
                location: request.location,
                notes: request.notes,
            });

            await repository.update(record);

            return record;
        }
    };
};
