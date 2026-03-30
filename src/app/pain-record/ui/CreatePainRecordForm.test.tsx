import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CreatePainRecordForm } from './CreatePainRecordForm';

describe('CreatePainRecordForm', () => {
    it('should call saveRecord prop with form values when submitted', async () => {
        const mockSaveRecord = vi.fn();
        const user = userEvent.setup();

        render(<CreatePainRecordForm saveRecord={mockSaveRecord} isPending={false} />);

        const dateInput = screen.getByLabelText(/fecha/i);
        fireEvent.change(dateInput, { target: { value: '2026-03-21' } });

        const slotSelect = screen.getByLabelText(/momento del día/i);
        await user.selectOptions(slotSelect, 'EVENING');

        const intensityInput = screen.getByLabelText(/intensidad/i);
        fireEvent.change(intensityInput, { target: { value: '8' } });

        const locationInput = screen.getByLabelText(/localización/i);
        await user.type(locationInput, 'Cabeza');

        const noteInput = screen.getByLabelText(/notas/i);
        await user.type(noteInput, 'Dolor punzante');

        const submitButton = screen.getByRole('button', { name: /guardar/i });
        await user.click(submitButton);

        expect(mockSaveRecord).toHaveBeenCalledTimes(1);
        expect(mockSaveRecord).toHaveBeenCalledWith(
            expect.objectContaining({
                intensity: 8,
                slot: 'EVENING',
                location: 'Cabeza',
                notes: 'Dolor punzante'
            })
        );
        
        const callArgs = mockSaveRecord.mock.calls[0][0];
        expect(callArgs.date.toISOString().startsWith('2026-03-21')).toBe(true);
    });
});
