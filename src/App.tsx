import { useState } from 'react';
import { AppShell } from '@/ui/layout/AppShell';
import { PainSlider } from '@/modules/pain-record/ui/PainSlider';
import { createPainIntensity } from '@/modules/pain-record/domain/PainIntensity';

function App() {
  const [intensity, setIntensity] = useState(createPainIntensity(0));

  return (
    <AppShell>
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pain Calendar</h1>
        <p className="text-muted-foreground mt-2">Registra tu dolor.</p>
      </header>

      <section className="p-6 rounded-2xl bg-card border border-border shadow-sm mb-6">
        <PainSlider value={intensity} onChange={setIntensity} />
      </section>

      <section className="p-6 rounded-2xl bg-card border border-border shadow-sm">
        <p className="text-card-foreground">
          Bienvenido. Aquí irán tus registros.
        </p>
      </section>
    </AppShell>
  );
}

export default App;
