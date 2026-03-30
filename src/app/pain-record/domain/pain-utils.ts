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
