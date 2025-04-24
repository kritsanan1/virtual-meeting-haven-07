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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface MeetingFormData {
  title: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  timeZone: string;
  repeat: string;
  attendees: string[];
  meetingId: "automatic" | "personal";
  description?: string;
}

interface Attendee {
  email: string;
}

const ScheduleMeeting = () => {
  const [date, setDate] = useState<Date>();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [attendeeInput, setAttendeeInput] = useState('');
  const [showTrialDialog, setShowTrialDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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

  const handleAddAttendee = () => {
    if (!attendeeInput.trim()) return;
    
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(attendeeInput) && attendeeInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setAttendees([...attendees, { email: attendeeInput }]);
    setAttendeeInput('');

    // Update the form value
    const currentAttendees = form.getValues("attendees") || [];
    form.setValue("attendees", [...currentAttendees, attendeeInput]);
  };

  const removeAttendee = (index: number) => {
    const newAttendees = [...attendees];
    newAttendees.splice(index, 1);
    setAttendees(newAttendees);
    
    // Update the form value
    const currentAttendees = form.getValues("attendees") || [];
    const updatedAttendees = [...currentAttendees];
    updatedAttendees.splice(index, 1);
    form.setValue("attendees", updatedAttendees);
  };

  const activateFreeTrial = () => {
    setShowTrialDialog(true);
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
    
    // Prepare the complete form data with all fields
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
    
    // Redirect to home page after successful scheduling
    setTimeout(() => navigate('/'), 1500);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
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
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded h-auto"
                onClick={activateFreeTrial}
              >
                FREE TRIAL
              </Button>
              <span className="text-sm">
                Set up a Zoom Scheduler booking page for others to easily book with you—free for 14 days!{" "}
                <button className="text-blue-600 underline" onClick={activateFreeTrial}>Try Now</button>
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
                      "justify-start text-left font-normal md:w-[200px] w-full transition-colors duration-200",
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
                        <SelectContent className="bg-white">
                          <SelectItem 
                            value="PST"
                            className="select-item"
                          >
                            Pakistan Standard Time
                          </SelectItem>
                          <SelectItem 
                            value="EST"
                            className="select-item"
                          >
                            Eastern Time
                          </SelectItem>
                          <SelectItem 
                            value="UTC"
                            className="select-item"
                          >
                            UTC
                          </SelectItem>
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedOption(value);
                      }}
                    >
                      <SelectTrigger className={cn(
                        "w-[150px] transition-colors duration-200",
                        selectedOption === field.value ? "bg-primary text-white" : "hover:text-white"
                      )}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem 
                          value="never"
                          className="transition-colors duration-200 hover:text-white hover:bg-primary/90"
                        >
                          Never
                        </SelectItem>
                        <SelectItem 
                          value="daily"
                          className="transition-colors duration-200 hover:text-white hover:bg-primary/90"
                        >
                          Daily
                        </SelectItem>
                        <SelectItem 
                          value="weekly"
                          className="transition-colors duration-200 hover:text-white hover:bg-primary/90"
                        >
                          Weekly
                        </SelectItem>
                        <SelectItem 
                          value="monthly"
                          className="transition-colors duration-200 hover:text-white hover:bg-primary/90"
                        >
                          Monthly
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Attendees</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Name or email address"
                  className="flex-1"
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAttendee();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddAttendee}>Add</Button>
              </div>
              
              {attendees.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{attendee.email}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttendee(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Meeting ID</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="meetingId"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="automatic"
                          checked={field.value === "automatic"}
                          onChange={() => field.onChange("automatic")}
                          className="rounded-full"
                        />
                        <label htmlFor="automatic">Generate Automatically</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="personal"
                          checked={field.value === "personal"}
                          onChange={() => field.onChange("personal")}
                          className="rounded-full"
                        />
                        <label htmlFor="personal">Personal Meeting ID 694 209 6101</label>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {showMoreOptions && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Additional Options</h3>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Description</FormLabel>
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
                onClick={handleMoreOptions}
              >
                {showMoreOptions ? "Hide Options" : "More Options"}
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>

        <Dialog open={showTrialDialog} onOpenChange={setShowTrialDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Activate Your Free Trial</DialogTitle>
              <DialogDescription>
                Enjoy all premium features of Zoom Scheduler for 14 days at no cost.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p>Your free trial includes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Custom booking pages</li>
                <li>Advanced scheduling options</li>
                <li>Calendar integration</li>
                <li>Automated reminders</li>
              </ul>
              <p className="text-sm text-gray-500">No credit card required. Cancel anytime.</p>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setShowTrialDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleFreeTrial}>
                Start Free Trial
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
