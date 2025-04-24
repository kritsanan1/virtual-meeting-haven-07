import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface MeetingInfoProps {
  meetingId: string;
}
const MeetingInfo: React.FC<MeetingInfoProps> = ({
  meetingId
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
  const {
    toast
  } = useToast();
  const currentDate = new Date();
  const meetingPassword = "Ceu98P";
  const participantId = "626032";
  const host = "Musaver";
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
  return <>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white hover:bg-gray-100">
        <Info className="h-5 w-5 text-gray-700" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="border-b pb-2">
            <div className="flex justify-between items-center bg-slate-200">
              <DialogTitle className="text-base font-normal">Meeting info</DialogTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Musaver's Zoom Meeting</h2>
              <p className="text-sm text-gray-500">{formattedTime}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Meeting ID</span>
                <div className="flex items-center gap-2">
                  <span>{meetingId}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(meetingId, "Meeting ID")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Passcode</span>
                <div className="flex items-center gap-2">
                  <span>{meetingPassword}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(meetingPassword, "Password")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Host</span>
                <span>{host}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Participant ID</span>
                <span>{participantId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Invite link</span>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 underline cursor-pointer" onClick={() => handleCopy(`https://us04web.zoom.us/j/${meetingId}`, "Invite link")}>
                    Copy link
                  </span>
                </div>
              </div>

              <div>
                <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="text-gray-500 hover:text-gray-700 text-sm">
                  {isDescriptionExpanded ? 'Hide join info' : 'Show join info'}
                </button>
                
                {isDescriptionExpanded && <div className="mt-2 text-sm text-gray-600 space-y-2">
                    <p>Musaver is inviting you to a scheduled Zoom meeting.</p>
                    <p className="font-medium">Join Zoom Meeting</p>
                    <a href={`https://us04web.zoom.us/j/${meetingId}`} className="text-blue-500 break-all hover:underline" target="_blank" rel="noopener noreferrer">
                      {`https://us04web.zoom.us/j/${meetingId}`}
                    </a>
                    <div className="pt-2">
                      <p>Meeting ID: {meetingId}</p>
                      <p>Passcode: {meetingPassword}</p>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default MeetingInfo;