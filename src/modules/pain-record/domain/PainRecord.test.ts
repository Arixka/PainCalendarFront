import { describe, it, expect } from 'vitest';
import { createPainRecord } from './PainRecord.ts';

describe('PainRecord Entity', () => {
    it('should be created with valid data', () => {

        const validData = {
            id: '123-uuid',
            date: new Date(),
            intensity: 5,
            location: 'cabeza',
        };

        const record = createPainRecord(validData);
        expect(record).toBeDefined();
        expect(record.intensity).toBe(5);
    });
});
