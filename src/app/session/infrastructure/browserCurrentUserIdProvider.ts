import type { CurrentUserIdProvider } from '../domain/CurrentUserIdProvider';

const STORAGE_KEY = 'pain-calendar.current-user-id';
const MIGRATION_KEY = 'pain-calendar.current-user-id-migrated';
const LEGACY_DEFAULT_USER_ID = '11111111-1111-1111-1111-111111111111';

export const createBrowserCurrentUserIdProvider = (): CurrentUserIdProvider => {
    return {
        getCurrentUserId: () => {
            const migrationApplied = window.localStorage.getItem(MIGRATION_KEY);

            if (!migrationApplied) {
                window.localStorage.setItem(STORAGE_KEY, LEGACY_DEFAULT_USER_ID);
                window.localStorage.setItem(MIGRATION_KEY, 'true');
                return LEGACY_DEFAULT_USER_ID;
            }

            const storedUserId = window.localStorage.getItem(STORAGE_KEY);

            if (storedUserId) {
                return storedUserId;
            }

            window.localStorage.setItem(STORAGE_KEY, LEGACY_DEFAULT_USER_ID);
            return LEGACY_DEFAULT_USER_ID;
        }
    };
};
