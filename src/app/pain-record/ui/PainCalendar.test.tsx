import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PainCalendar } from './PainCalendar';

describe('PainCalendar UI Component', () => {
    it('renderiza el mes correcto basado en viewingDate', () => {
        const mockDate = new Date(2026, 4, 1);
        
        render(
            <PainCalendar 
                records={[]} 
                viewingDate={mockDate} 
                onMonthChange={vi.fn()} 
                onSelectDay={vi.fn()} 
            />
        );

        expect(screen.getByText('Mayo 2026')).toBeDefined();
    });

    it('llama a onSelectDay cuando se hace click en un día', () => {
        const mockDate = new Date(2026, 4, 15);
        const handleSelectDay = vi.fn();
        
        render(
            <PainCalendar 
                records={[]} 
                viewingDate={mockDate} 
                onMonthChange={vi.fn()} 
                onSelectDay={handleSelectDay} 
            />
        );

        const dayButton = screen.getByText('15');
        fireEvent.click(dayButton);

        expect(handleSelectDay).toHaveBeenCalledOnce();
        const calledWithDate = handleSelectDay.mock.calls[0][0] as Date;
        expect(calledWithDate.getDate()).toBe(15);
        expect(calledWithDate.getMonth()).toBe(4);
    });
});
