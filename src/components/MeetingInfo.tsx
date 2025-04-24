
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";

interface MeetingInfoProps {
  meetingId: string;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({ meetingId }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
        className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
      >
        <Info className="h-5 w-5 text-gray-700" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Meeting info</DialogTitle>
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
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Musaver's Meeting</h2>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Meeting ID</span>
                <span>{meetingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Invite link</span>
                <a href="#" className="text-blue-500">Copy link</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Passcode</span>
                <span>Ceu98P</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingInfo;
