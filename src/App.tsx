import { useState } from 'react';
import { AppShell } from '@/ui/layout/AppShell';
import { CreatePainRecordForm } from '@/app/pain-record/ui/CreatePainRecordForm';
import { PainCalendar } from '@/app/pain-record/ui/PainCalendar';
import { useCreatePainRecord } from '@/app/pain-record/ui/useCreatePainRecord';
import { createPainRecordService } from '@/app/pain-record/application/CreatePainRecordService';
import { createHttpPainRecordRepository } from '@/app/pain-record/infrastructure/HttpPainRecordRepository';
import type { PainRecord } from '@/app/pain-record/domain/PainRecord';

function App() {
  const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const repository = createHttpPainRecordRepository(backendUrl, '11111111-1111-1111-1111-111111111111');
  const service = createPainRecordService(repository);
  
  const { isPending, error, saveRecord } = useCreatePainRecord(service, {
      onSuccess: () => {
          console.log('¡Guardado con éxito en la base de datos!');
          setSelectedDate(null);
      }
  });

  const [viewingDate, setViewingDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const mockRecords: PainRecord[] = [
    {
       id: '1', date: new Date(), slot: 'MORNING', intensity: 8 as any 
    },
    {
       id: '2', date: new Date(new Date().setDate(new Date().getDate() - 2)), slot: 'AFTERNOON', intensity: 3 as any 
    }
  ];

  // Buscamos el registro que corresponda al día seleccionado para editarlo
  const selectedRecord = selectedDate 
    ? mockRecords.find(r => r.date.getFullYear() === selectedDate.getFullYear() && r.date.getMonth() === selectedDate.getMonth() && r.date.getDate() === selectedDate.getDate()) 
    : undefined;

  return (
    <AppShell>
      <header className="flex flex-col items-center mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pain Calendar</h1>
        <p className="text-muted-foreground mt-2">Registra y visualiza tu dolor.</p>
      </header>

      <section className="flex items-start justify-center">
          <PainCalendar 
              records={mockRecords}
              viewingDate={viewingDate}
              onMonthChange={setViewingDate}
              onSelectDay={(date) => setSelectedDate(date)}
          />
      </section>

      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           
           <div className="absolute inset-0" onClick={() => setSelectedDate(null)}></div>

           <div className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-3xl p-6 w-full max-w-sm relative shadow-2xl animate-in zoom-in-95 duration-200">
               <button 
                  onClick={() => setSelectedDate(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full bg-zinc-100 dark:bg-white/5 font-bold cursor-pointer transition-colors"
                  aria-label="Cerrar modal"
               >
                  ✕
               </button>
               
               <h3 className="text-lg font-bold mb-4 flex flex-col">
                  <span className="text-xs text-blue-500 uppercase tracking-wider font-semibold">Registro del Día</span>
                  {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
               </h3>
               
               <CreatePainRecordForm 
                  saveRecord={saveRecord} 
                  isPending={isPending} 
                  initialData={selectedRecord}
                  selectedDate={selectedDate}
               />
               {error && <p className="text-red-500 mt-2 text-sm text-center">{error.message}</p>}
           </div>
        </div>
      )}
    </AppShell>
  );
}

export default App;
