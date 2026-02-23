import type { PainRecord } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';

export const createHttpPainRecordRepository = (baseUrl: string): PainRecordRepository => {
    return {
        save: async (record: PainRecord): Promise<void> => {
            const payload = {
                userId: '11111111-1111-1111-1111-111111111111',
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
