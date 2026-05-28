import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CreatePainRecordForm } from './CreatePainRecordForm';

describe('CreatePainRecordForm', () => {
    it('should call saveRecord prop with form values when submitted', async () => {
        const mockSaveRecord = vi.fn();
        const user = userEvent.setup();

        const testDate = new Date('2026-03-21T12:00:00Z');
        render(<CreatePainRecordForm saveRecord={mockSaveRecord} isPending={false} selectedDate={testDate} />);

        const confirmButton = screen.getByRole('button', { name: /sí, registrar dolor/i });
        await user.click(confirmButton);

        const slotSelect = screen.getByLabelText(/en qué momento/i);
        await user.selectOptions(slotSelect, 'EVENING');

        const intensityInput = screen.getByRole('slider'); 
        fireEvent.change(intensityInput, { target: { value: '8' } });

        const locationInput = screen.getByLabelText(/localización/i);
        await user.type(locationInput, 'Cabeza');

        const noteInput = screen.getByLabelText(/notas/i);
        await user.type(noteInput, 'Dolor punzante');

        const submitButton = screen.getByRole('button', { name: /guardar registro/i });
        await user.click(submitButton);

        expect(mockSaveRecord).toHaveBeenCalledTimes(1);
        expect(mockSaveRecord).toHaveBeenCalledWith(
            expect.objectContaining({
                intensity: 8,
                slot: 'EVENING',
                location: 'Cabeza',
                notes: 'Dolor punzante',
                date: testDate
            })
        );
    });
});
