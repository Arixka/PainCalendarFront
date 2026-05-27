import type { ReactNode } from 'react';

export type DayCardProps = {
    date: Date;
    onClose: () => void;
    children?: ReactNode;
};

const formatDate = (date: Date): string => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
};

export const DayCard = ({ date, onClose, children }: DayCardProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-background/90 backdrop-blur-xl border border-border rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-5 border-b border-border bg-background/50">
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">
                        {formatDate(date)}
                    </h3>
                    <button
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};
