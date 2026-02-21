import { type CSSProperties } from 'react';
import { Slider } from '@/ui/components/Slider';
import { createPainIntensity, type PainIntensity } from '@/modules/pain-record/domain/PainIntensity';
import { getPainColor, getPainLabel } from '@/modules/pain-record/domain/pain-utils';

type PainSliderProps = {
    readonly value: PainIntensity;
    readonly onChange: (value: PainIntensity) => void;
};

export const PainSlider = ({ value, onChange }: PainSliderProps) => {
    const color = getPainColor(value);
    const label = getPainLabel(value);

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-end px-1">
                <span
                    className="text-sm font-medium tracking-wide transition-colors duration-300"
                    style={{ color }}
                >
                    {value} &middot; {label}
                </span>
            </div>

            <Slider
                value={[value]}
                min={0}
                max={10}
                step={1}
                onValueChange={([v]) => onChange(createPainIntensity(v))}
                className="py-4"
                style={{ '--slider-color': color } as CSSProperties}
            />

            <div className="flex justify-between px-1 text-sm text-muted-foreground font-medium w-full">
                <span>0</span>
                <span>10</span>
            </div>
        </div>
    );
};
