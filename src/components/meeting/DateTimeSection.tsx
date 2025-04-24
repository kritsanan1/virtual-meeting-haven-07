
import React from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { MeetingFormData } from "./types";

interface DateTimeSectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  form: UseFormReturn<MeetingFormData>;
}

export function DateTimeSection({ date, setDate, form }: DateTimeSectionProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal md:w-[200px] w-full",
              !date && "text-muted-foreground",
              "hover:bg-[#07563c] hover:text-white hover:border-[#07563c]"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2 flex-wrap">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger 
                  className="w-[120px] hover:bg-[#07563c] hover:text-white hover:border-[#07563c]"
                  style={{ transition: "background-color 0.2s, color 0.2s, border-color 0.2s" }}
                >
                  <SelectValue placeholder="09:00" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem
                      key={i}
                      value={`${String(i).padStart(2, '0')}:00`}
                      className="select-item"
                    >
                      {`${String(i).padStart(2, '0')}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <span className="text-gray-500">to</span>

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger 
                  className="w-[120px] hover:bg-[#07563c] hover:text-white hover:border-[#07563c]"
                  style={{ transition: "background-color 0.2s, color 0.2s, border-color 0.2s" }}
                >
                  <SelectValue placeholder="09:30" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem
                      key={i}
                      value={`${String(i).padStart(2, '0')}:30`}
                      className="select-item"
                    >
                      {`${String(i).padStart(2, '0')}:30`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger 
                  className="w-full hover:bg-[#07563c] hover:text-white hover:border-[#07563c]"
                  style={{ transition: "background-color 0.2s, color 0.2s, border-color 0.2s" }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
