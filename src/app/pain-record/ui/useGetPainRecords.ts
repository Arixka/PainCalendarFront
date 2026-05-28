import { useState, useEffect, useCallback } from 'react';
import type { PainRecordSummary } from '../domain/PainRecord';

export const useGetPainRecords = (
    service: { execute: (year: number, month: number) => Promise<PainRecordSummary[]> },
    year: number,
    month: number
) => {
    const [records, setRecords] = useState<PainRecordSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchRecords = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await service.execute(year, month);
            setRecords(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error fetching records'));
        } finally {
            setIsLoading(false);
        }
    }, [service, year, month]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    return {
        records,
        isLoading,
        error,
        refetch: fetchRecords
    };
};
