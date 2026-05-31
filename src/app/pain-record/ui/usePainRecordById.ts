import { useEffect, useState } from 'react';
import type { PainRecord } from '../domain/PainRecord';

export const usePainRecordById = (
    service: { execute: (id: string) => Promise<PainRecord> },
    id?: string
) => {
    const [record, setRecord] = useState<PainRecord | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) {
            setRecord(null);
            setIsLoading(false);
            setError(null);
            return;
        }

        let isCancelled = false;

        setIsLoading(true);
        setError(null);

        service.execute(id)
            .then((result) => {
                if (!isCancelled) {
                    setRecord(result);
                }
            })
            .catch((err) => {
                if (!isCancelled) {
                    setError(err instanceof Error ? err : new Error('Unknown error fetching pain record'));
                    setRecord(null);
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [id, service]);

    return {
        record,
        isLoading,
        error
    };
};
