import { useActionState } from 'react';
import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';

export const useCreatePainRecord = (
    service: { execute: (req: CreatePainRecordRequest) => Promise<any> },
    options?: { onSuccess?: () => void }
) => {
    const [error, submitAction, isPending] = useActionState(
        async (_previousState: Error | null, request: CreatePainRecordRequest) => {
            try {
                await service.execute(request);
                options?.onSuccess?.();
                return null;
            } catch (err) {
                return err instanceof Error ? err : new Error('Unknown error occurred');
            }
        },
        null
    );

    return {
        isPending,
        error,
        saveRecord: submitAction
    };
};
