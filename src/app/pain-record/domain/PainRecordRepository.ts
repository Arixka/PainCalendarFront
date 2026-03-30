import type { PainRecord } from './PainRecord';

export type PainRecordRepository = {
    save: (record: PainRecord) => Promise<void>;
};
