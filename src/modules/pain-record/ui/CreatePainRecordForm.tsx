import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';
import type { Slot } from '../domain/Slot';

type Props = {
    saveRecord: (request: CreatePainRecordRequest) => void;
    isPending: boolean;
};

export const CreatePainRecordForm = ({ saveRecord, isPending }: Props) => {
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

    // default date as today for the input
    const today = new Date().toISOString().split('T')[0];

    return (
        <form action={handleAction} className="flex flex-col gap-4 max-w-sm">
            <div>
                 <label htmlFor="dateId" className="block text-sm font-medium mb-1">Fecha</label>
                 <input type="date" id="dateId" name="date" defaultValue={today} required className="w-full border p-2 rounded text-black bg-white dark:text-white dark:bg-gray-800" />
            </div>

            <div>
                 <label htmlFor="slotId" className="block text-sm font-medium mb-1">Momento del Día</label>
                 <select id="slotId" name="slot" defaultValue="MORNING" className="w-full border p-2 rounded text-black bg-white dark:text-white dark:bg-gray-800">
                     <option value="MORNING">Mañana</option>
                     <option value="AFTERNOON">Tarde</option>
                     <option value="EVENING">Noche</option>
                     <option value="NIGHT">Madrugada</option>
                 </select>
            </div>

            <div>
                <label htmlFor="intensityId" className="block text-sm font-medium mb-1">Intensidad</label>
                <input 
                    type="range" 
                    id="intensityId" 
                    name="intensity" 
                    min="1" 
                    max="10" 
                    defaultValue="5"
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>1 (Leve)</span>
                    <span>10 (Máximo)</span>
                </div>
            </div>

            <div>
                 <label htmlFor="locationId" className="block text-sm font-medium mb-1">Localización (opcional)</label>
                 <input type="text" id="locationId" name="location" placeholder="Ej: Cabeza, Espalda..." className="w-full border p-2 rounded text-black bg-white dark:text-white dark:bg-gray-800" />
            </div>

            <div>
                 <label htmlFor="noteId" className="block text-sm font-medium mb-1">Notas (opcional)</label>
                 <textarea id="noteId" name="note" rows={3} placeholder="Detalles extra..." className="w-full border p-2 rounded text-black bg-white dark:text-white dark:bg-gray-800" />
            </div>

            <button type="submit" disabled={isPending} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors">
                {isPending ? 'Guardando...' : 'Guardar Registro'}
            </button>
        </form>
    );
};
