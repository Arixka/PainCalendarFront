import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DayCard } from './DayCard.tsx';

describe('DayCard UI Component', () => {
    it('renderiza la fecha proporcionada', () => {
        const mockDate = new Date(2026, 4, 15);
        render(<DayCard date={mockDate} onClose={vi.fn()} />);

        expect(screen.getByText('15/05/2026')).toBeDefined();
    });

    it('llama a onClose cuando se presiona el botón de cerrar', () => {
        const handleClose = vi.fn();
        render(<DayCard date={new Date()} onClose={handleClose} />);

        const closeButton = screen.getByRole('button', { name: /cerrar/i });
        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledOnce();
    });
});
