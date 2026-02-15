import type { ReactNode } from 'react';

type AppShellProps = {
    readonly children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
    return (
        <div className="min-h-dvh w-full bg-background text-foreground flex flex-col antialiased overflow-x-hidden transition-colors duration-300">
            <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-4 sm:p-6 pb-20">
                {children}
            </main>
        </div>
    );
};
