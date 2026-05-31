const getRequiredEnv = (key: string): string => {
    const value = import.meta.env[key];

    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`Missing required frontend environment variable: ${key}`);
    }

    return value;
};

export const config = {
    apiBaseUrl: getRequiredEnv('VITE_API_BASE_URL'),
} as const;
