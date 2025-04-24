
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ConnectionBanners } from "@/components/meeting/ConnectionBanners";
import { TrialDialog } from "@/components/meeting/TrialDialog";
import { AttendeesSection } from "@/components/meeting/AttendeesSection";
import { MeetingIdSection } from "@/components/meeting/MeetingIdSection";
import { Attendee, MeetingFormData } from "@/components/meeting/types";

const ScheduleMeeting = () => {
  const [date, setDate] = useState<Date>();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [showTrialDialog, setShowTrialDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<MeetingFormData>({
    defaultValues: {
      title: "",
      date: undefined,
      startTime: "09:00",
      endTime: "09:30",
      timeZone: "PST",
      repeat: "never",
      attendees: [],
      meetingId: "automatic",
      description: "",
    },
  });

  const handleAddAttendee = (email: string) => {
    setAttendees([...attendees, { email }]);
    const currentAttendees = form.getValues("attendees") || [];
    form.setValue("attendees", [...currentAttendees, email]);
  };

  const handleRemoveAttendee = (index: number) => {
    const newAttendees = [...attendees];
    newAttendees.splice(index, 1);
    setAttendees(newAttendees);
    
    const currentAttendees = form.getValues("attendees") || [];
    const updatedAttendees = [...currentAttendees];
    updatedAttendees.splice(index, 1);
    form.setValue("attendees", updatedAttendees);
  };

  const handleFreeTrial = () => {
    setShowTrialDialog(false);
    toast({
      title: "Free trial activated!",
      description: "Your 14-day free trial of Zoom Scheduler has started",
    });
  };

  const onSubmit = (data: MeetingFormData) => {
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a meeting date",
        variant: "destructive",
      });
      return;
    }
    
    const completeData = {
      ...data,
      date,
      attendees: attendees.map(a => a.email),
    };
    
    console.log(completeData);
    
    toast({
      title: "Meeting Scheduled",
      description: `Your meeting "${completeData.title}" has been scheduled for ${format(date, "PPP")}`,
    });
    
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <ConnectionBanners onActivateFreeTrial={() => setShowTrialDialog(true)} />

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
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal md:w-[200px] w-full",
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
                    className={cn("p-3 pointer-events-auto")}
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
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="09:00" />
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
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="09:30" />
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
                        <SelectTrigger className="w-full">
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

            <div className="flex items-center gap-4">
              <span className="text-gray-700">Repeat</span>
              <FormField
                control={form.control}
                name="repeat"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
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
                  </FormItem>
                )}
              />
            </div>

            <AttendeesSection
              attendees={attendees}
              onAddAttendee={handleAddAttendee}
              onRemoveAttendee={handleRemoveAttendee}
            />

            <MeetingIdSection form={form} />

            {showMoreOptions && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Additional Options</h3>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add a description for your meeting"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
                {showMoreOptions ? "Hide Options" : "More Options"}
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>

        <TrialDialog
          open={showTrialDialog}
          onOpenChange={setShowTrialDialog}
          onActivate={handleFreeTrial}
        />
      </div>
    </div>
  );
};

export default ScheduleMeeting;
