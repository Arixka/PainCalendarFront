import type { PainRecord, PainRecordSummary } from './PainRecord';

export type PainRecordRepository = {
    create: (record: PainRecord) => Promise<void>;
    update: (record: PainRecord) => Promise<void>;
    getById: (id: string) => Promise<PainRecord>;
    getByMonth: (year: number, month: number) => Promise<PainRecordSummary[]>;
};
