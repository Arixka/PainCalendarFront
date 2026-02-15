export type PainIntensity = number & { readonly __brand: unique symbol };

export const createPainIntensity = (value: number): PainIntensity => {
    if (!Number.isInteger(value) || value < 0 || value > 10) {
        throw new Error('Intensity must be an integer between 0 and 10');
    }
    return value as PainIntensity;
};
