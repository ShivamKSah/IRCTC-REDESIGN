
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, ArrowRight } from "lucide-react";

interface DateSelectorProps {
  label: string;
  id: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  error?: string;
}

const DateSelector = ({
  label,
  id,
  date,
  onDateChange,
  minDate = new Date(),
  maxDate,
  className = "",
  error,
}: DateSelectorProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    onDateChange(date);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              error ? "border-destructive ring-destructive" : "",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            disabled={(date) => {
              const beforeMinDate = minDate ? date < minDate : false;
              const afterMaxDate = maxDate ? date > maxDate : false;
              return beforeMinDate || afterMaxDate;
            }}
            className={cn("p-3 pointer-events-auto")}
          />
          <div className="p-3 border-t border-border flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                // Set to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                handleSelect(tomorrow);
              }}
            >
              Tomorrow
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                // Set to day after tomorrow
                const dayAfter = new Date();
                dayAfter.setDate(dayAfter.getDate() + 2);
                handleSelect(dayAfter);
              }}
            >
              Day After
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default DateSelector;
