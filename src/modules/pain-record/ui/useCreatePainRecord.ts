import { useTransition, useState } from 'react';
import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';

export const useCreatePainRecord = (
    service: { execute: (req: CreatePainRecordRequest) => Promise<any> },
    options?: { onSuccess?: () => void }
) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<Error | null>(null);

    const saveRecord = (request: CreatePainRecordRequest) => {
        startTransition(async () => {
            try {
                setError(null);
                await service.execute(request);
                options?.onSuccess?.();
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            }
        });
    };

    return {
        isPending,
        error,
        saveRecord
    };
};
