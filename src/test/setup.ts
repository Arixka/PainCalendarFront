import '@testing-library/jest-dom';
import { vi } from 'vitest';

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.ResizeObserver = ResizeObserver;

if (typeof window.PointerEvent === 'undefined') {
    window.PointerEvent = class PointerEvent extends Event { } as any;
}
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.setPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
