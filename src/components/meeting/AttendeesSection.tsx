
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Attendee {
  email: string;
}

interface AttendeesSectionProps {
  attendees: Attendee[];
  onAddAttendee: (email: string) => void;
  onRemoveAttendee: (index: number) => void;
}

export function AttendeesSection({ 
  attendees, 
  onAddAttendee, 
  onRemoveAttendee 
}: AttendeesSectionProps) {
  const [attendeeInput, setAttendeeInput] = useState('');
  const { toast } = useToast();

  const handleAddAttendee = () => {
    if (!attendeeInput.trim()) return;
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(attendeeInput) && attendeeInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    onAddAttendee(attendeeInput);
    setAttendeeInput('');
  };

  return (
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
                onClick={() => onRemoveAttendee(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
