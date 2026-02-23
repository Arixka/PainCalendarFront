import { AppShell } from '@/ui/layout/AppShell';
import { CreatePainRecordForm } from '@/modules/pain-record/ui/CreatePainRecordForm';
import { useCreatePainRecord } from '@/modules/pain-record/ui/useCreatePainRecord';
import { createPainRecordService } from '@/modules/pain-record/application/CreatePainRecordService';
import { createHttpPainRecordRepository } from '@/modules/pain-record/infrastructure/HttpPainRecordRepository';

function App() {
  const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const repository = createHttpPainRecordRepository(backendUrl, '11111111-1111-1111-1111-111111111111');
  const service = createPainRecordService(repository);
  
  const { isPending, error, saveRecord } = useCreatePainRecord(service, {
      onSuccess: () => alert('¡Guardado con éxito en la base de datos!')
  });

  return (
    <AppShell>
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pain Calendar</h1>
        <p className="text-muted-foreground mt-2">Registra tu dolor.</p>
      </header>

      <section className="p-6 rounded-2xl bg-card border border-border shadow-sm mb-6">
        <h2 className="text-xl mb-4 font-semibold text-card-foreground">Nuevo Registro</h2>
        <CreatePainRecordForm saveRecord={saveRecord} isPending={isPending} />
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </section>

      <section className="p-6 rounded-2xl bg-card border border-border shadow-sm">
        <p className="text-card-foreground">
          Bienvenido. Aquí irán tus registros guardados.
        </p>
      </section>
    </AppShell>
  );
}

export default App;
