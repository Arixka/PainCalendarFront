import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CreatePainRecordForm } from './CreatePainRecordForm';

describe('CreatePainRecordForm', () => {
    it('should call saveRecord prop with form values when submitted', async () => {
        const mockSaveRecord = vi.fn();
        const user = userEvent.setup();

        render(<CreatePainRecordForm saveRecord={mockSaveRecord} isPending={false} />);

        const intensityInput = screen.getByLabelText(/intensidad/i);
        // Simulamos mover el slider a 8
        vi.spyOn(intensityInput as HTMLInputElement, 'value', 'get').mockReturnValue('8');

        const submitButton = screen.getByRole('button', { name: /guardar/i });
        await user.click(submitButton);

        expect(mockSaveRecord).toHaveBeenCalledTimes(1);
        expect(mockSaveRecord).toHaveBeenCalledWith(
            expect.objectContaining({
                intensity: 8,
                slot: 'MORNING',
            })
        );
    });
});
