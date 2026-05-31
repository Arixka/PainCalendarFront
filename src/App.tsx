import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/ui/layout/AppShell';
import { CreatePainRecordForm } from '@/app/pain-record/ui/CreatePainRecordForm';
import { PainCalendar } from '@/app/pain-record/ui/PainCalendar';
import { DayCard } from '@/app/pain-record/ui/DayCard';
import { useGetPainRecords } from '@/app/pain-record/ui/useGetPainRecords';
import { usePainRecordById } from '@/app/pain-record/ui/usePainRecordById';
import { useSavePainRecord } from '@/app/pain-record/ui/useSavePainRecord';
import { createPainRecordDependencies } from '@/app/pain-record/infrastructure/painRecordDependencies';
import { createBrowserCurrentUserIdProvider } from '@/app/session/infrastructure/browserCurrentUserIdProvider';
import { config } from '@/config/env';

function App() {
  const currentUserIdProvider = useMemo(() => createBrowserCurrentUserIdProvider(), []);
  const currentUserId = useMemo(() => currentUserIdProvider.getCurrentUserId(), [currentUserIdProvider]);

  const { createPainRecordService, updatePainRecordService, getPainRecordByIdService, getMonthlyPainRecordsService } = useMemo(
    () => createPainRecordDependencies(config.apiBaseUrl, currentUserId),
    [currentUserId]
  );

  const [viewingDate, setViewingDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { records, refetch } = useGetPainRecords(
    getMonthlyPainRecordsService,
    viewingDate.getFullYear(),
    viewingDate.getMonth() + 1
  );

  const selectedRecordSummary = selectedDate
    ? records.find((record) =>
        record.date.getFullYear() === selectedDate.getFullYear() &&
        record.date.getMonth() === selectedDate.getMonth() &&
        record.date.getDate() === selectedDate.getDate()
      )
    : undefined;

  const { record: selectedRecord, isLoading: isLoadingSelectedRecord, error: selectedRecordError } = usePainRecordById(
    getPainRecordByIdService,
    selectedRecordSummary?.id
  );

  const { isPending, error, saveRecord } = useSavePainRecord({
    create: createPainRecordService,
    update: updatePainRecordService,
  }, {
    onSuccess: () => {
      console.log('Guardado con exito en la base de datos');
      setSelectedDate(null);
      refetch();
    }
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastPrompt = localStorage.getItem('lastPromptDate');

    if (lastPrompt !== todayStr) {
      setSelectedDate(new Date());
      localStorage.setItem('lastPromptDate', todayStr);
    }
  }, []);

  return (
    <AppShell>
      <header className="flex flex-col items-center mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pain Calendar</h1>
        <p className="text-muted-foreground mt-2">Registra y visualiza tu dolor.</p>
      </header>

      <section className="flex items-start justify-center">
        <PainCalendar
          records={records}
          viewingDate={viewingDate}
          selectedDate={selectedDate}
          onMonthChange={setViewingDate}
          onSelectDay={setSelectedDate}
        />
      </section>

      {selectedDate && (
        <DayCard date={selectedDate} onClose={() => setSelectedDate(null)}>
          {selectedRecordSummary ? (
            isLoadingSelectedRecord ? (
              <p className="text-zinc-400 text-sm text-center py-6">Cargando registro...</p>
            ) : selectedRecord ? (
              <CreatePainRecordForm
                saveRecord={saveRecord}
                isPending={isPending}
                initialData={selectedRecord}
                selectedDate={selectedDate}
                onCancel={() => setSelectedDate(null)}
              />
            ) : null
          ) : (
            <CreatePainRecordForm
              saveRecord={saveRecord}
              isPending={isPending}
              selectedDate={selectedDate}
              onCancel={() => setSelectedDate(null)}
            />
          )}
          {selectedRecordError && <p className="text-red-500 mt-2 text-sm text-center">{selectedRecordError.message}</p>}
          {error && <p className="text-red-500 mt-2 text-sm text-center">{error.message}</p>}
        </DayCard>
      )}
    </AppShell>
  );
}

export default App;
