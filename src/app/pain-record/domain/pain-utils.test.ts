import { describe, it, expect } from 'vitest';
import { getCurrentSlot } from './pain-utils';
import type { Slot } from './Slot';

describe('pain-utils - getCurrentSlot', () => {
    it('debe retornar MORNING entre las 06:00 y las 11:59', () => {
        const morningDate = new Date();
        morningDate.setHours(9, 30);
        expect(getCurrentSlot(morningDate)).toBe('MORNING' satisfies Slot);
    });

    it('debe retornar AFTERNOON entre las 12:00 y las 17:59', () => {
        const afternoonDate = new Date();
        afternoonDate.setHours(15, 0);
        expect(getCurrentSlot(afternoonDate)).toBe('AFTERNOON' satisfies Slot);
    });

    it('debe retornar EVENING entre las 18:00 y las 21:59', () => {
        const eveningDate = new Date();
        eveningDate.setHours(20, 15);
        expect(getCurrentSlot(eveningDate)).toBe('EVENING' satisfies Slot);
    });

    it('debe retornar NIGHT entre las 22:00 y las 05:59', () => {
        const nightDate1 = new Date();
        nightDate1.setHours(23, 45);
        expect(getCurrentSlot(nightDate1)).toBe('NIGHT' satisfies Slot);

        const nightDate2 = new Date();
        nightDate2.setHours(3, 10);
        expect(getCurrentSlot(nightDate2)).toBe('NIGHT' satisfies Slot);
    });
});
