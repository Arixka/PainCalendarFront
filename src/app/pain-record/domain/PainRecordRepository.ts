import type { PainRecord, PainRecordSummary } from './PainRecord';

export type PainRecordRepository = {
    save: (record: PainRecord) => Promise<void>;
    getByMonth: (year: number, month: number) => Promise<PainRecordSummary[]>;
};
