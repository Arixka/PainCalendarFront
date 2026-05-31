import type { PainRecord, PainRecordSummary } from '../domain/PainRecord';
import type { PainRecordRepository } from '../domain/PainRecordRepository';
import { createPainIntensity } from '../domain/PainIntensity';
import { createPainRecord } from '../domain/PainRecord';
import type {
    CreatePainRecordHttpRequest,
    PainRecordDetailHttpResponse,
    PainRecordSummaryHttpResponse,
    UpdatePainRecordHttpRequest,
} from './painRecordHttpDtos';

export const createHttpPainRecordRepository = (baseUrl: string, userId: string): PainRecordRepository => {
    return {
        create: async (record: PainRecord): Promise<void> => {
            const payload: CreatePainRecordHttpRequest = {
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
        update: async (record: PainRecord): Promise<void> => {
            const payload: UpdatePainRecordHttpRequest = {
                userId,
                date: record.date.toISOString().split('T')[0],
                slot: record.slot,
                intensity: record.intensity,
                location: record.location,
                note: record.notes
            };

            const response = await fetch(`${baseUrl}/pain-records/${record.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to update pain record: ${response.status}`);
            }
        },
        getById: async (id: string): Promise<PainRecord> => {
            const response = await fetch(`${baseUrl}/pain-records/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch pain record: ${response.status}`);
            }

            const data = (await response.json()) as PainRecordDetailHttpResponse;

            return createPainRecord({
                id: data.id,
                date: new Date(data.date),
                slot: data.slot as PainRecord['slot'],
                intensity: data.intensity,
                location: data.location ?? undefined,
                notes: data.note ?? undefined,
            });
        },
        getByMonth: async (year: number, month: number): Promise<PainRecordSummary[]> => {
            const response = await fetch(`${baseUrl}/pain-records?userId=${userId}&year=${year}&month=${month}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch pain records: ${response.status}`);
            }

            const data = (await response.json()) as PainRecordSummaryHttpResponse[];
            
            return data.map((item) => ({
                id: item.id,
                date: new Date(item.date),
                intensity: createPainIntensity(item.intensity),
                location: item.location ?? ""
            }));
        }
    };
};
