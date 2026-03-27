import { useState } from 'react';
import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';
import type { Slot } from '../domain/Slot';
import type { PainRecord } from '../domain/PainRecord';

type Props = {
    saveRecord: (request: CreatePainRecordRequest) => void;
    isPending: boolean;
    initialData?: PainRecord;
    selectedDate?: Date; // Si viene seleccionada del calendario
};

export const CreatePainRecordForm = ({ saveRecord, isPending, initialData, selectedDate }: Props) => {
    // Para simplificar la UI, vamos a asumir que manejamos la intensidad como numero real para el form
    const [intensityValue, setIntensityValue] = useState<number>(
        initialData ? (initialData.intensity as unknown as number) : 5
    );

    const handleAction = (formData: FormData) => {
        const intensity = Number(formData.get('intensity'));
        const dateInput = formData.get('date') as string;
        const date = dateInput ? new Date(dateInput) : new Date();
        const slot = (formData.get('slot') as Slot) || 'MORNING';
        const location = formData.get('location') as string;
        const note = formData.get('note') as string;
        
        saveRecord({
            intensity,
            slot,
            date,
            ...(location && { location }),
            ...(note && { notes: note })
        });
    };

    // Usamos el selectedDate si viene del calendario, o el de initialData, o la de hoy.
    const defaultDateDate = selectedDate || (initialData?.date) || new Date();
    // formateamos sin zonas horarias locales erráticas
    const year = defaultDateDate.getFullYear();
    const month = String(defaultDateDate.getMonth() + 1).padStart(2, "0");
    const day = String(defaultDateDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <form action={handleAction} className="flex flex-col gap-4 max-w-sm">
            <div>
                 <label htmlFor="dateId" className="block text-sm font-medium mb-1">Fecha</label>
                 <input 
                    type="date" 
                    id="dateId" 
                    name="date" 
                    defaultValue={formattedDate} 
                    required 
                    className="w-full border border-black/10 dark:border-white/10 p-2 rounded text-black bg-white dark:text-white dark:bg-transparent" 
                 />
            </div>

            <div>
                 <label htmlFor="slotId" className="block text-sm font-medium mb-1">Momento del Día</label>
                 <select 
                    id="slotId" 
                    name="slot" 
                    defaultValue={initialData?.slot || "MORNING"} 
                    className="w-full border border-black/10 dark:border-white/10 p-2 rounded text-black bg-white dark:text-white dark:bg-zinc-900"
                 >
                     <option value="MORNING">Mañana</option>
                     <option value="AFTERNOON">Tarde</option>
                     <option value="EVENING">Noche</option>
                     <option value="NIGHT">Madrugada</option>
                 </select>
            </div>

            <div>
                 <label htmlFor="intensityId" className="block text-sm font-medium mb-1 flex justify-between">
                    <span>Intensidad</span>
                    <span className="text-blue-500 font-bold">{intensityValue}</span>
                 </label>
                 <input 
                    type="range" 
                    id="intensityId" 
                    name="intensity" 
                    min="1" 
                    max="10" 
                    value={intensityValue}
                    onChange={(e) => setIntensityValue(Number(e.target.value))}
                    className="w-full cursor-pointer accent-blue-500"
                 />
                 <div className="flex justify-between text-xs text-gray-500 mt-1">
                     <span>1 (Leve)</span>
                     <span>10 (Máximo)</span>
                 </div>
            </div>

            <div>
                 <label htmlFor="locationId" className="block text-sm font-medium mb-1 mt-2">Localización (opcional)</label>
                 <input 
                    type="text" 
                    id="locationId" 
                    name="location" 
                    defaultValue={initialData?.location || ""}
                    placeholder="Ej: Cabeza, Espalda..." 
                    className="w-full border border-black/10 dark:border-white/10 p-2 rounded text-black bg-white dark:text-white dark:bg-transparent" 
                 />
            </div>

            <div>
                 <label htmlFor="noteId" className="block text-sm font-medium mb-1">Notas (opcional)</label>
                 <textarea 
                    id="noteId" 
                    name="note" 
                    rows={2} 
                    defaultValue={initialData?.notes || ""}
                    placeholder="Detalles extra..." 
                    className="w-full border border-black/10 dark:border-white/10 p-2 rounded text-black bg-white dark:text-white dark:bg-transparent" 
                 />
            </div>

            <button type="submit" disabled={isPending} className="bg-blue-600 text-white p-2.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium cursor-pointer mt-2">
                {isPending ? 'Guardando...' : (initialData ? 'Actualizar Registro' : 'Guardar Registro')}
            </button>
        </form>
    );
};
