import type { PainRecord } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';

export const createHttpPainRecordRepository = (baseUrl: string, userId: string): PainRecordRepository => {
    return {
        save: async (record: PainRecord): Promise<void> => {
            const payload = {
                userId,
                date: record.date.toISOString(),
                slot: record.slot,
                intensity: record.intensity,
                location: record.location,
                note: record.notes,
                medications: []
            };

            const response = await fetch(`${baseUrl}/pain-records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to save pain record: ${response.status}`);
            }
        }
    };
};
