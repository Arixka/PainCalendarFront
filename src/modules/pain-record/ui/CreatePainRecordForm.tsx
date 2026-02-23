import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';

type Props = {
    saveRecord: (request: CreatePainRecordRequest) => void;
    isPending: boolean;
};

export const CreatePainRecordForm = ({ saveRecord, isPending }: Props) => {
    const handleAction = (formData: FormData) => {
        const intensity = Number(formData.get('intensity'));
        
        saveRecord({
            intensity,
            slot: 'MORNING', // Hardcodeado hasta que validemos el diseño
            date: new Date()
        });
    };

    return (
        <form action={handleAction} className="flex flex-col gap-4 max-w-sm">
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

            <button type="submit" disabled={isPending} className="bg-blue-500 text-white p-2 rounded">
                {isPending ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
};
