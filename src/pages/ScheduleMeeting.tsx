
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingFormData {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  timeZone: string;
  repeat: string;
  attendees: string;
  meetingId: "automatic" | "personal";
}

const ScheduleMeeting = () => {
  const [date, setDate] = useState<Date>();
  const form = useForm<MeetingFormData>({
    defaultValues: {
      meetingId: "automatic",
      repeat: "never",
    },
  });

  const onSubmit = (data: MeetingFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="text-sm">
                Connect your calendar to manage all your events in one place and experience all advanced features!{" "}
                <a href="#" className="underline">Connect</a>
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">FREE TRIAL</span>
              <span className="text-sm">
                Set up a Zoom Scheduler booking page for others to easily book with you—free for 14 days!{" "}
                <a href="#" className="text-blue-600 underline">Try Now</a>
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Meeting Title"
                      className="text-lg border-2 rounded-md p-4"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-[200px]",
                      !date && "text-muted-foreground"
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
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Select defaultValue="09:00">
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem
                      key={i}
                      value={`${String(i).padStart(2, '0')}:00`}
                    >
                      {`${String(i).padStart(2, '0')}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-500">to</span>

              <Select defaultValue="09:30">
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem
                      key={i}
                      value={`${String(i).padStart(2, '0')}:30`}
                    >
                      {`${String(i).padStart(2, '0')}:30`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="PST">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PST">Pakistan Standard Time</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-700">Repeat</span>
              <Select defaultValue="never">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Attendees</h3>
              <Input
                placeholder="Name or email address"
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Meeting ID</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="automatic"
                    value="automatic"
                    className="rounded-full"
                    defaultChecked
                  />
                  <label htmlFor="automatic">Generate Automatically</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="personal"
                    value="personal"
                    className="rounded-full"
                  />
                  <label htmlFor="personal">Personal Meeting ID 694 209 6101</label>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline">More Options</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
