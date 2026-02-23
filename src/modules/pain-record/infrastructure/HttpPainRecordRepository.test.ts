import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHttpPainRecordRepository } from './HttpPainRecordRepository';
import { createPainRecord } from '../domain/PainRecord';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

describe('HttpPainRecordRepository', () => {
    beforeEach(() => {
        fetchMock.mockClear();
    });

    it('should send a POST request to the API to save the pain record', async () => {
        const repository = createHttpPainRecordRepository('http://localhost:8080/api', '11111111-1111-1111-1111-111111111111');

        const dummyRecord = createPainRecord({
            id: '123-abc',
            date: new Date('2026-02-23T10:00:00Z'),
            slot: 'MORNING',
            intensity: 8,
            location: 'Head',
            notes: 'Migraña fuerte'
        });

        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 201,
        });

        await repository.save(dummyRecord);

        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/pain-records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: '11111111-1111-1111-1111-111111111111',
                date: '2026-02-23T10:00:00.000Z',
                slot: 'MORNING',
                intensity: 8,
                location: 'Head',
                note: 'Migraña fuerte',
                medications: []
            })
        });
    });
});
