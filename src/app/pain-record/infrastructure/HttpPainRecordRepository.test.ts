import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHttpPainRecordRepository } from './HttpPainRecordRepository';
import { createPainRecord } from '../domain/PainRecord';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

describe('HttpPainRecordRepository', () => {
    beforeEach(() => {
        fetchMock.mockClear();
    });

    it('should send a POST request to the API to create the pain record', async () => {
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

        await repository.create(dummyRecord);

        expect(fetchMock).toHaveBeenCalledTimes(1);

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/pain-records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: '11111111-1111-1111-1111-111111111111',
                date: '2026-02-23',
                slot: 'MORNING',
                intensity: 8,
                location: 'Head',
                note: 'Migraña fuerte',
                medications: []
            })
        });
    });

    it('should send a PUT request to the API to update the pain record', async () => {
        const repository = createHttpPainRecordRepository('http://localhost:8080/api', '11111111-1111-1111-1111-111111111111');

        const dummyRecord = createPainRecord({
            id: '123-abc',
            date: new Date('2026-02-23T10:00:00Z'),
            slot: 'NIGHT',
            intensity: 6,
            location: 'Neck',
            notes: 'Dolor actualizado'
        });

        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 204,
        });

        await repository.update(dummyRecord);

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/pain-records/123-abc', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: '11111111-1111-1111-1111-111111111111',
                date: '2026-02-23',
                slot: 'NIGHT',
                intensity: 6,
                location: 'Neck',
                note: 'Dolor actualizado'
            })
        });
    });

    it('should fetch a pain record by id from the API', async () => {
        const repository = createHttpPainRecordRepository('http://localhost:8080/api', '11111111-1111-1111-1111-111111111111');

        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({
                id: '123-abc',
                date: '2026-02-23',
                slot: 'NIGHT',
                intensity: 8,
                location: 'Head',
                note: 'Migraña fuerte'
            })
        });

        const record = await repository.getById('123-abc');

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/pain-records/123-abc');
        expect(record).toEqual({
            id: '123-abc',
            date: new Date('2026-02-23'),
            slot: 'NIGHT',
            intensity: 8,
            location: 'Head',
            notes: 'Migraña fuerte'
        });
    });

    it('should fetch monthly pain records from the API', async () => {
        const repository = createHttpPainRecordRepository('http://localhost:8080/api', '11111111-1111-1111-1111-111111111111');

        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue([
                {
                    id: '123-abc',
                    date: '2026-02-23',
                    intensity: 8,
                    location: 'Head'
                }
            ])
        });

        const records = await repository.getByMonth(2026, 2);

        expect(fetchMock).toHaveBeenCalledWith(
            'http://localhost:8080/api/pain-records?userId=11111111-1111-1111-1111-111111111111&year=2026&month=2'
        );
        expect(records).toEqual([
            {
                id: '123-abc',
                date: new Date('2026-02-23'),
                intensity: 8,
                location: 'Head'
            }
        ]);
    });
});
