import { createPainIntensity, type PainIntensity } from './PainIntensity';
import type { Slot } from './Slot';

export type PainRecordProps = {
    readonly id: string;
    readonly date: Date;
    readonly slot: Slot;
    readonly intensity: number;
    readonly location?: string;
    readonly notes?: string;
};

export type PainRecord = {
    readonly id: string;
    readonly date: Date;
    readonly slot: Slot;
    readonly intensity: PainIntensity;
    readonly location?: string;
    readonly notes?: string;
};

export const createPainRecord = (props: PainRecordProps): PainRecord => {
    return {
        ...props,
        intensity: createPainIntensity(props.intensity),
    };
};
