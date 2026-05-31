import type { PainRecord, PainRecordSummary } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';
import { createPainIntensity } from '../domain/PainIntensity';

export const createHttpPainRecordRepository = (baseUrl: string, userId: string): PainRecordRepository => {
    return {
        save: async (record: PainRecord): Promise<void> => {
            const payload = {
                userId,
                date: record.date.toISOString().split('T')[0],
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
        },
        getByMonth: async (year: number, month: number): Promise<PainRecordSummary[]> => {
            const response = await fetch(`${baseUrl}/pain-records?userId=${userId}&year=${year}&month=${month}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch pain records: ${response.status}`);
            }
            
            type PainRecordResponse = {
                id: string;
                date: string;
                intensity: number;
                location: string | null;
            };

            const data = (await response.json()) as PainRecordResponse[];
            
            return data.map((item) => ({
                id: item.id,
                date: new Date(item.date),
                intensity: createPainIntensity(item.intensity),
                location: item.location ?? ""
            }));
        }
    };
};
