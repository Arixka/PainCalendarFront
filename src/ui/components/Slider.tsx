import { type ComponentProps } from 'react';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

type SliderProps = ComponentProps<typeof Root>;

export function Slider({ className, ...props }: SliderProps) {
    return (
        <Root
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            {...props}
        >
            <Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <Range
                    className="absolute h-full transition-colors"
                    style={{ backgroundColor: 'var(--slider-color, hsl(var(--primary)))' }}
                />
            </Track>
            <Thumb
                className="block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                style={{ borderColor: 'var(--slider-color, hsl(var(--primary)))' }}
            />
        </Root>
    );
}
