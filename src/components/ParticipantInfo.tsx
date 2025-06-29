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
        <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-meeting-primary hover:text-white transition-colors">
          <Users className="h-4 w-4" />
          <span>{participants.length}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="p-3 border-b bg-gray-50">
          <h3 className="font-medium text-meeting-dark">
            Participants ({participants.length})
          </h3>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {participants.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No participants yet</p>
            </div>
          ) : (
            participants.map((participant) => (
              <div key={participant.id} className="p-3 border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-meeting-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      {participant.name}
                    </span>
                    {participant.isLocal && (
                      <span className="ml-2 text-xs text-meeting-primary font-medium">
                        (You)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ParticipantInfo;