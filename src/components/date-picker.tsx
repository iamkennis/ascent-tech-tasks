import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldValues } from "react-hook-form";


interface DatePickerProps {
  icon?: React.ReactNode;
  field?: FieldValues;
  className?: string;
  placeholder?: string | any;
  disabled?: boolean;
  meetings?: boolean;
}
const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export default function DatePicker({
  icon,
  field,
  className,
  placeholder = "Pick a date",
  disabled = false,
  meetings = false,
}: DatePickerProps) {
  const [time, setTime] = React.useState('00:00');
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    field?.value && isValidDate(new Date(field.value))
      ? new Date(field.value)
      : undefined
  );

  React.useEffect(() => {
    if (field?.value && isValidDate(new Date(field.value))) {
      const date = new Date(field.value);
      setSelectedDate(date);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }
  }, [field?.value]);

  const updateFieldValue = (date: Date | undefined, newTime: string) => {
    if (date && meetings) {
      const [hours, minutes] = newTime.split(':');
      const updatedDate = new Date(date);
      updatedDate.setHours(Number(hours));
      updatedDate.setMinutes(Number(minutes));
      field?.onChange?.(format(updatedDate, "dd-MM-yyyy, EEEE, hh:mm a"));
    } else if (date) {
      const updatedDate = new Date(date);
      updatedDate.setHours(0);
      updatedDate.setMinutes(0);
      field?.onChange?.(format(updatedDate, "yyyy-MM-dd"));
    }
  };

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateFieldValue(date, time);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    updateFieldValue(selectedDate, newTime);
  };

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
              !field?.value && "text-muted-foreground"
            )}
          >
            {field?.value && isValidDate(new Date(field.value)) ? (
              format(
                new Date(field.value),
                meetings ? "dd-MM-yyyy, EEEE, hh:mm a" : "yyyy-MM-dd"
              )
            ) : (
              <span>{placeholder}</span>
            )}
            {icon && <span className="ml-auto h-4 w-4 opacity-50">{icon}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full" align="start">
          <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} />
          {meetings && (
            <div className="mt-4">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                required
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}