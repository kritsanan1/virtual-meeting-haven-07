import React, { useState } from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MeetingFormData } from "./types";
import { DateTimeSection } from "./DateTimeSection";
import { AttendeesSection } from "./AttendeesSection";
import { MeetingIdSection } from "./MeetingIdSection";

interface MeetingFormProps {
  onSubmitSuccess?: () => void;
}

export function MeetingForm({ onSubmitSuccess }: MeetingFormProps) {
  const [date, setDate] = useState<Date>();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [attendees, setAttendees] = useState<{ email: string }[]>([]);
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

    onSubmitSuccess?.();
    setTimeout(() => navigate('/'), 1500);
  };

  return (
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

        <DateTimeSection 
          date={date}
          setDate={setDate}
          form={form}
        />

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
            className="hover:bg-[#07563c] hover:text-white"
          >
            {showMoreOptions ? "Hide Options" : "More Options"}
          </Button>
          <Button 
            type="submit" 
            className="bg-[#07563c] hover:bg-[#07563c]/90 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
