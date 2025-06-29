import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeetingInfoProps {
  meetingId: string;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({ meetingId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
  const { toast } = useToast();
  
  const currentDate = new Date();
  const meetingPassword = "Ceu98P";
  const participantId = "626032";
  const host = "Meeting Host";
  
  const formattedTime = `${currentDate.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} has been copied to clipboard`
    });
  };

  const meetingUrl = `${window.location.origin}/meeting/${meetingId}`;

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="outline" 
        size="icon" 
        className="rounded-full h-12 w-12 bg-white hover:bg-gray-100 transition-colors"
        title="Meeting information"
      >
        <Info className="h-5 w-5 text-gray-700" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="border-b pb-3">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-lg font-semibold text-meeting-dark">
                Meeting Information
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-semibold text-meeting-dark">Video Conference</h2>
              <p className="text-sm text-gray-500">{formattedTime}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Meeting ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-meeting-dark">{meetingId}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => handleCopy(meetingId, "Meeting ID")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Passcode</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-meeting-dark">{meetingPassword}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => handleCopy(meetingPassword, "Passcode")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Host</span>
                <span className="text-meeting-dark">{host}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Participant ID</span>
                <span className="font-mono text-meeting-dark">{participantId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Meeting Link</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                    onClick={() => handleCopy(meetingUrl, "Meeting link")}
                  >
                    Copy link
                  </Button>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} 
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  {isDescriptionExpanded ? 'Hide join info' : 'Show join info'}
                </button>
                
                {isDescriptionExpanded && (
                  <div className="mt-3 text-sm text-gray-600 space-y-2 bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">Join Video Conference</p>
                    <a 
                      href={meetingUrl} 
                      className="text-blue-600 hover:text-blue-700 break-all underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {meetingUrl}
                    </a>
                    <div className="pt-2 space-y-1">
                      <p><span className="font-medium">Meeting ID:</span> {meetingId}</p>
                      <p><span className="font-medium">Passcode:</span> {meetingPassword}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingInfo;