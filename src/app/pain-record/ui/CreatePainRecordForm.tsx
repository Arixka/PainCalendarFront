import { useState } from 'react';
import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';
import type { Slot } from '../domain/Slot';
import type { PainRecord, PainRecordSummary } from '../domain/PainRecord';
import { getCurrentSlot } from '../domain/pain-utils';

type Props = {
    saveRecord: (request: CreatePainRecordRequest) => void;
    isPending: boolean;
    initialData?: PainRecord | PainRecordSummary;
    selectedDate?: Date;
    onCancel?: () => void;
};

type FormStep = 'CONFIRMATION' | 'DETAILS';

export const CreatePainRecordForm = ({ saveRecord, isPending, initialData, selectedDate, onCancel }: Props) => {
    const [step, setStep] = useState<FormStep>(initialData ? 'DETAILS' : 'CONFIRMATION');

    const [intensityValue, setIntensityValue] = useState<number>(initialData ? (initialData.intensity as unknown as number) : 1);
    const [slotValue, setSlotValue] = useState<Slot>((initialData && 'slot' in initialData) ? initialData.slot : getCurrentSlot(new Date()));
    const [locationValue, setLocationValue] = useState<string>(initialData?.location || "");
    const [noteValue, setNoteValue] = useState<string>((initialData && 'notes' in initialData) ? initialData.notes || "" : "");

    const handleSubmitDetails = (e: React.FormEvent) => {
        e.preventDefault();
        const finalDate = selectedDate || (initialData?.date) || new Date();
        
        saveRecord({
            intensity: intensityValue,
            slot: slotValue,
            date: finalDate,
            ...(locationValue && { location: locationValue }),
            ...(noteValue && { notes: noteValue })
        });
    };

    const isToday = () => {
        const d = selectedDate || new Date();
        const today = new Date();
        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    };

    if (step === 'CONFIRMATION') {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                    {isToday() ? "¿Has sentido dolor hoy?" : "¿Sentiste dolor este día?"}
                </h4>
                <p className="text-zinc-400 text-sm mb-6">
                    Llevar un registro nos ayudará a encontrar patrones en tu salud.
                </p>
                
                <div className="flex flex-col w-full gap-3">
                    <button 
                        onClick={() => setStep('DETAILS')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer"
                    >
                        Sí, registrar dolor
                    </button>
                    <button 
                        onClick={() => onCancel?.()}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer"
                    >
                        No, me siento genial
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmitDetails} className="flex flex-col gap-5 animate-in slide-in-from-right-4 fade-in">
            {/* Intensity Slider */}
            <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                 <label htmlFor="intensityId" className="block text-sm font-medium mb-3 flex justify-between items-center">
                    <span className="text-zinc-300">Nivel de Intensidad</span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold text-lg">{intensityValue}</span>
                 </label>
                 <input 
                    type="range" 
                    id="intensityId" 
                    min="1" 
                    max="10" 
                    value={intensityValue}
                    onChange={(e) => setIntensityValue(Number(e.target.value))}
                    className="w-full cursor-pointer accent-blue-500 h-2 bg-zinc-700 rounded-lg appearance-none"
                 />
                 <div className="flex justify-between text-xs text-zinc-500 mt-2 font-medium">
                     <span>1 (Mínimo)</span>
                     <span>10 (Insoportable)</span>
                 </div>
            </div>

            {/* Slot Selector */}
            <div>
                 <label htmlFor="slotId" className="block text-sm font-medium mb-1.5 text-zinc-300">¿En qué momento?</label>
                 <select 
                    id="slotId" 
                    value={slotValue}
                    onChange={(e) => setSlotValue(e.target.value as Slot)}
                    className="w-full border border-zinc-700 p-3 rounded-xl text-white bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                 >
                     <option value="MORNING">Por la Mañana</option>
                     <option value="AFTERNOON">Por la Tarde</option>
                     <option value="EVENING">Al Anochecer</option>
                     <option value="NIGHT">De Madrugada</option>
                     <option value="ALL_DAY">Todo el día 😩</option>
                 </select>
            </div>

            {/* Optional Details */}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label htmlFor="locationId" className="block text-sm font-medium mb-1.5 text-zinc-300">Localización (Opcional)</label>
                    <input 
                        type="text" 
                        id="locationId" 
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        placeholder="Ej: Cabeza, Espalda..." 
                        className="w-full border border-zinc-700 p-3 rounded-xl text-white bg-zinc-800/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    />
                </div>

                <div>
                    <label htmlFor="noteId" className="block text-sm font-medium mb-1.5 text-zinc-300">Notas (Opcional)</label>
                    <textarea 
                        id="noteId" 
                        rows={2} 
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                        placeholder="Desencadenantes, medicación..." 
                        className="w-full border border-zinc-700 p-3 rounded-xl text-white bg-zinc-800/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                    />
                </div>
            </div>

            <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white p-3.5 rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-colors font-semibold cursor-pointer mt-2 shadow-lg shadow-blue-500/20">
                {isPending ? 'Guardando...' : (initialData ? 'Actualizar Registro' : 'Guardar Registro')}
            </button>
        </form>
    );
};
