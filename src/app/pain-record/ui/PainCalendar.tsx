import { useMemo } from "react";
import { getPainColor } from "../domain/pain-utils";
import type { PainRecordSummary } from "../domain/PainRecord";

export type PainCalendarProps = {
  records: readonly PainRecordSummary[];
  viewingDate: Date;
  selectedDate?: Date | null;
  onMonthChange: (newDate: Date) => void;
  onSelectDay: (date: Date) => void;
};

const DAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getDailyMaxIntensities = (records: readonly PainRecordSummary[]): Map<string, number> => {
  const map = new Map<string, number>();
  for (const record of records) {
    const key = formatDateKey(record.date);
    const intensity = record.intensity as unknown as number;
    const currentMax = map.get(key) ?? 0;
    if (intensity > currentMax) {
      map.set(key, intensity);
    }
  }
  return map;
};

export const PainCalendar = ({
  records,
  viewingDate,
  selectedDate,
  onMonthChange,
  onSelectDay,
}: PainCalendarProps) => {
  const year = viewingDate.getFullYear();
  const month = viewingDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [year, month]);

  const prevMonth = () => onMonthChange(new Date(year, month - 1, 1));
  const nextMonth = () => onMonthChange(new Date(year, month + 1, 1));

  const todayKey = formatDateKey(new Date());
  
  const intensitiesMap = useMemo(() => getDailyMaxIntensities(records), [records]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer text-zinc-400 hover:text-white"
          aria-label="Mes anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <h2 className="text-lg font-semibold text-white">
          {MONTHS_ES[month]} {year}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer text-zinc-400 hover:text-white"
          aria-label="Mes siguiente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_ES.map((d) => (
          <div key={d} className="text-center text-xs text-zinc-400 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="aspect-square" />;
          
          const key = formatDateKey(date);
          const hasRecord = intensitiesMap.has(key);
          const intensity = intensitiesMap.get(key) ?? 0;
          const color = getPainColor(hasRecord ? intensity : 0);
          const isSelected = selectedDate ? formatDateKey(selectedDate) === key : false;
          
          return (
            <button
              key={key}
              onClick={() => onSelectDay(date)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-110 relative cursor-pointer outline-none ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
              style={{ backgroundColor: color }}
            >
              <span className={intensity > 6 ? "text-white" : hasRecord && intensity > 0 ? "text-black" : "text-muted-foreground"}>
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6 text-xs text-zinc-400">
        {[
          { label: "Sin registro", color: getPainColor(0) },
          { label: "Leve", color: getPainColor(1) },
          { label: "Moderado", color: getPainColor(4) },
          { label: "Intenso", color: getPainColor(7) },
          { label: "Crisis", color: getPainColor(9) },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <span 
               className="w-3 h-3 rounded-sm inline-block" 
               style={{ backgroundColor: item.color }} 
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
