import { describe, it, expect } from 'vitest';
import { createPainIntensity } from './PainIntensity.ts';

describe('PainIntensity Value Object', () => {
    it('should create valid intensity', () => {
        expect(createPainIntensity(5)).toBe(5);
    });

    it('should throw error for invalid values', () => {
        expect(() => createPainIntensity(-1)).toThrow();
        expect(() => createPainIntensity(11)).toThrow();
        expect(() => createPainIntensity(5.5)).toThrow();
    });
});
