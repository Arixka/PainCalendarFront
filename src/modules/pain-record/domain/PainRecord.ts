import { createPainIntensity, type PainIntensity } from './PainIntensity';

export type PainRecordProps = {
    readonly id: string;
    readonly date: Date;
    readonly intensity: number;
    readonly location: string;
};

export type PainRecord = {
    readonly id: string;
    readonly date: Date;
    readonly intensity: PainIntensity;
    readonly location: string;
};

export const createPainRecord = (props: PainRecordProps): PainRecord => {
    return {
        ...props,
        intensity: createPainIntensity(props.intensity),
    };
};
