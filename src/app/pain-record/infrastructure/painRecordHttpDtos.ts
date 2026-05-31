export type CreatePainRecordHttpRequest = {
    readonly userId: string;
    readonly date: string;
    readonly slot: string;
    readonly intensity: number;
    readonly location?: string;
    readonly note?: string;
    readonly medications: readonly MedicationIntakeHttpRequest[];
};

export type UpdatePainRecordHttpRequest = {
    readonly userId: string;
    readonly date: string;
    readonly slot: string;
    readonly intensity: number;
    readonly location?: string;
    readonly note?: string;
};

export type MedicationIntakeHttpRequest = {
    readonly medicationId: string;
    readonly quantity: number;
};

export type PainRecordDetailHttpResponse = {
    readonly id: string;
    readonly date: string;
    readonly slot: string;
    readonly intensity: number;
    readonly location: string | null;
    readonly note: string | null;
};

export type PainRecordSummaryHttpResponse = {
    readonly id: string;
    readonly date: string;
    readonly intensity: number;
    readonly location: string | null;
};
