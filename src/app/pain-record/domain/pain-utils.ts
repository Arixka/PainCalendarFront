import type { Slot } from './Slot';

export const getCurrentSlot = (date: Date = new Date()): Slot => {
    const hour = date.getHours();
    
    if (hour >= 6 && hour < 12) return 'MORNING';
    if (hour >= 12 && hour < 18) return 'AFTERNOON';
    if (hour >= 18 && hour < 22) return 'EVENING';
    
    return 'NIGHT';
};

export const getPainColor = (intensity: number): string => {
    if (intensity === 0) return "hsl(var(--pain-none))"; // Gris
    if (intensity <= 3) return "hsl(var(--pain-mild))";  // Amarillo
    if (intensity <= 6) return "hsl(var(--pain-moderate))"; // Naranja
    if (intensity <= 8) return "hsl(var(--pain-intense))"; // Rojo
    return "hsl(var(--pain-crisis))"; // Rojo Oscuro
};

export const getPainLabel = (intensity: number): string => {
    if (intensity === 0) return "Sin registro";
    if (intensity <= 3) return "Leve";
    if (intensity <= 6) return "Moderado";
    if (intensity <= 8) return "Intenso";
    return "Crisis";
};
