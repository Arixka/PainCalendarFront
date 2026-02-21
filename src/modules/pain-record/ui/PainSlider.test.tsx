import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PainSlider } from './PainSlider';
import { createPainIntensity } from '../domain/PainIntensity';

describe('PainSlider UI Component', () => {
    it('should render the initial pain intensity value visually', () => {
        const testIntensity = createPainIntensity(5);
        render(<PainSlider value={testIntensity} onChange={vi.fn()} />);
        expect(screen.getByText(/5/)).toBeInTheDocument();
        expect(screen.getByText(/Moderado/)).toBeInTheDocument();
    });

    it('should call onChange with the new intensity when interacting', () => {
        const initialIntensity = createPainIntensity(5);
        const handleChange = vi.fn();

        render(<PainSlider value={initialIntensity} onChange={handleChange} />);

        const sliderThumb = screen.getByRole('slider');
        fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(6);
    });
});
