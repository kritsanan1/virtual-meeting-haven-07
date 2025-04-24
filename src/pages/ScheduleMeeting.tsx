
import React, { useState } from 'react';
import { ConnectionBanners } from "@/components/meeting/ConnectionBanners";
import { TrialDialog } from "@/components/meeting/TrialDialog";
import { MeetingForm } from "@/components/meeting/MeetingForm";
import { useToast } from "@/hooks/use-toast";

const ScheduleMeeting = () => {
  const [showTrialDialog, setShowTrialDialog] = useState(false);
  const { toast } = useToast();

  const handleFreeTrial = () => {
    setShowTrialDialog(false);
    toast({
      title: "Free trial activated!",
      description: "Your 14-day free trial of Zoom Scheduler has started",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <ConnectionBanners 
          onActivateFreeTrial={() => setShowTrialDialog(true)} 
          className="hover:text-white" 
        />
        
        <MeetingForm />

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
