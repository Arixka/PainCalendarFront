import { useActionState } from 'react';
import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';
import type { UpdatePainRecordRequest } from '../application/UpdatePainRecordService';

export type SavePainRecordRequest = CreatePainRecordRequest & {
    readonly id?: string;
};

export const useSavePainRecord = (
    services: {
        create: { execute: (req: CreatePainRecordRequest) => Promise<unknown> };
        update: { execute: (req: UpdatePainRecordRequest) => Promise<unknown> };
    },
    options?: { onSuccess?: () => void }
) => {
    const [error, submitAction, isPending] = useActionState(
        async (_previousState: Error | null, request: SavePainRecordRequest) => {
            try {
                if (request.id) {
                    await services.update.execute({
                        id: request.id,
                        date: request.date,
                        intensity: request.intensity,
                        slot: request.slot,
                        location: request.location,
                        notes: request.notes,
                    });
                } else {
                    await services.create.execute({
                        date: request.date,
                        intensity: request.intensity,
                        slot: request.slot,
                        location: request.location,
                        notes: request.notes,
                    });
                }

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
