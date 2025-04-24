
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-meeting-primary text-center mb-8">
            Schedule a Meeting
          </h1>
          
          <ConnectionBanners 
            onActivateFreeTrial={() => setShowTrialDialog(true)} 
            className="hover:text-white" 
          />
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <MeetingForm />
          </div>
        </div>

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
