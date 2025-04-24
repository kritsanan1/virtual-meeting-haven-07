
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ParticipantInfoProps {
  participants: {
    id: string;
    name: string;
    isLocal: boolean;
  }[];
}

const ParticipantInfo: React.FC<ParticipantInfoProps> = ({ participants }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Users className="h-4 w-4 text-[#07563c]" />
          <span>{participants.length}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="p-2 border-b">
          <h3 className="font-medium">Participants ({participants.length})</h3>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {participants.map((participant) => (
            <div key={participant.id} className="p-2 border-b last:border-b-0 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-meeting-primary rounded-full flex items-center justify-center text-white">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
                <span>{participant.name} {participant.isLocal && "(You)"}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ParticipantInfo;
