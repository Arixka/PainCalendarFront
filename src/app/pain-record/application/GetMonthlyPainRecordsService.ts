import type { PainRecordSummary } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';

export const createGetMonthlyPainRecordsService = (repository: PainRecordRepository) => {
    return {
        execute: async (year: number, month: number): Promise<PainRecordSummary[]> => {
            const records = await repository.getByMonth(year, month);
            return records.sort((a, b) => a.date.getTime() - b.date.getTime());
        }
    };
};
