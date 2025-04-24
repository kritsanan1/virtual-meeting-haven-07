import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, ScreenShare, ScreenShareOff, Phone } from 'lucide-react';
import HostTools from './HostTools';
import Reactions from './Reactions';
import MeetingInfo from './MeetingInfo';
import PreviewOptions from './PreviewOptions';

interface ControlPanelProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleScreenSharing: () => void;
  leaveMeeting: () => void;
  isHost?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  toggleAudio,
  toggleVideo,
  toggleScreenSharing,
  leaveMeeting,
  isHost = false,
}) => {
  const urlParams = new URLSearchParams(window.location.pathname);
  const meetingId = urlParams.get('/meeting/') || '124567';

  return (
    <div className="control-bar fixed bottom-0 left-0 right-0 p-3 flex justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 md:gap-4">
        <MeetingInfo meetingId={meetingId} />
        
        <Button
          onClick={toggleAudio}
          variant={isAudioEnabled ? "outline" : "destructive"}
          size="icon"
          className={`rounded-full h-12 w-12 ${isAudioEnabled ? 'bg-white hover:bg-gray-100' : ''}`}
        >
          {isAudioEnabled ? <Mic /> : <MicOff />}
        </Button>
        
        <Button
          onClick={toggleVideo}
          variant={isVideoEnabled ? "outline" : "destructive"}
          size="icon"
          className={`rounded-full h-12 w-12 ${isVideoEnabled ? 'bg-white hover:bg-gray-100' : ''}`}
        >
          {isVideoEnabled ? <Video /> : <VideoOff />}
        </Button>
        
        <Button
          onClick={toggleScreenSharing}
          variant={isScreenSharing ? "destructive" : "outline"}
          size="icon"
          className={`rounded-full h-12 w-12 ${!isScreenSharing ? 'bg-white hover:bg-gray-100' : ''}`}
        >
          {isScreenSharing ? <ScreenShareOff /> : <ScreenShare />}
        </Button>
        
        <Reactions />
        
        <PreviewOptions />
        
        {isHost && <HostTools isHost={isHost} />}
        
        <Button
          onClick={leaveMeeting}
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <Phone className="rotate-[135deg]" />
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
