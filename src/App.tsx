import { useState, useEffect } from 'react';
import { AppShell } from '@/ui/layout/AppShell';
import { CreatePainRecordForm } from '@/app/pain-record/ui/CreatePainRecordForm';
import { PainCalendar } from '@/app/pain-record/ui/PainCalendar';
import { DayCard } from '@/app/pain-record/ui/DayCard';
import { useCreatePainRecord } from '@/app/pain-record/ui/useCreatePainRecord';
import { createPainRecordService } from '@/app/pain-record/application/CreatePainRecordService';
import { createGetMonthlyPainRecordsService } from '@/app/pain-record/application/GetMonthlyPainRecordsService';
import { createHttpPainRecordRepository } from '@/app/pain-record/infrastructure/HttpPainRecordRepository';
import { useGetPainRecords } from '@/app/pain-record/ui/useGetPainRecords';
import type { PainRecord } from '@/app/pain-record/domain/PainRecord';

function App() {
  const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const repository = createHttpPainRecordRepository(backendUrl, '11111111-1111-1111-1111-111111111111');
  const service = createPainRecordService(repository);
  const getRecordsService = createGetMonthlyPainRecordsService(repository);
  
  const [viewingDate, setViewingDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const { records, refetch } = useGetPainRecords(
      getRecordsService, 
      viewingDate.getFullYear(), 
      viewingDate.getMonth() + 1
  );

  const { isPending, error, saveRecord } = useCreatePainRecord(service, {
      onSuccess: () => {
          console.log('¡Guardado con éxito en la base de datos!');
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

  const selectedRecord = selectedDate 
    ? records.find(r => r.date.getFullYear() === selectedDate.getFullYear() && r.date.getMonth() === selectedDate.getMonth() && r.date.getDate() === selectedDate.getDate()) 
    : undefined;

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
              onSelectDay={(date) => setSelectedDate(date)}
          />
      </section>

      {selectedDate && (
        <DayCard date={selectedDate} onClose={() => setSelectedDate(null)}>
           <CreatePainRecordForm 
              saveRecord={saveRecord} 
              isPending={isPending} 
              initialData={selectedRecord}
              selectedDate={selectedDate}
              onCancel={() => setSelectedDate(null)}
           />
           {error && <p className="text-red-500 mt-2 text-sm text-center">{error.message}</p>}
        </DayCard>
      )}
    </AppShell>
  );
}

export default App;
