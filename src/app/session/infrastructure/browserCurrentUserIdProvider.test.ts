import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createBrowserCurrentUserIdProvider } from './browserCurrentUserIdProvider';

describe('browserCurrentUserIdProvider', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.restoreAllMocks();
    });

    it('should persist the legacy development user id when none exists', () => {
        const provider = createBrowserCurrentUserIdProvider();

        expect(provider.getCurrentUserId()).toBe('11111111-1111-1111-1111-111111111111');
        expect(window.localStorage.getItem('pain-calendar.current-user-id'))
            .toBe('11111111-1111-1111-1111-111111111111');
        expect(window.localStorage.getItem('pain-calendar.current-user-id-migrated')).toBe('true');
    });

    it('should replace a previously generated temporary user id on first migration', () => {
        window.localStorage.setItem('pain-calendar.current-user-id', 'generated-user-id');

        const provider = createBrowserCurrentUserIdProvider();

        expect(provider.getCurrentUserId()).toBe('11111111-1111-1111-1111-111111111111');
        expect(window.localStorage.getItem('pain-calendar.current-user-id'))
            .toBe('11111111-1111-1111-1111-111111111111');
    });

    it('should reuse the stored user id when it already exists', () => {
        window.localStorage.setItem('pain-calendar.current-user-id', 'existing-user-id');
        window.localStorage.setItem('pain-calendar.current-user-id-migrated', 'true');

        const provider = createBrowserCurrentUserIdProvider();

        expect(provider.getCurrentUserId()).toBe('existing-user-id');
    });
});
