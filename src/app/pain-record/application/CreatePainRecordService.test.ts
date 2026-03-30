import { describe, it, expect, vi } from 'vitest';
import { createPainRecordService } from './CreatePainRecordService';
import type { PainRecordRepository } from '../domain/PainRecordRepository';

describe('CreatePainRecordService', () => {
    it('should create a valid pain record and save it to the repository', async () => {
        const mockRepository: PainRecordRepository = {
            save: vi.fn().mockResolvedValue(undefined),
        };

        const service = createPainRecordService(mockRepository);

        const request = {
            intensity: 7,
            slot: 'MORNING' as const,
            location: 'head',
            date: new Date('2026-02-21'),
        };

        const result = await service.execute(request);

        expect(result.intensity).toBe(7);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(mockRepository.save).toHaveBeenCalledWith(result);
    });
});
