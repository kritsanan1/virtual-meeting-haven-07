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
  const urlParams = new URLSearchParams(window.location.search);
  const meetingId = window.location.pathname.split('/meeting/')[1] || '124567';

  return (
    <div className="control-bar fixed bottom-0 left-0 right-0 p-3 flex justify-center bg-white/90 backdrop-blur-sm border-t border-gray-200">
      <div className="flex items-center gap-2 md:gap-4">
        <MeetingInfo meetingId={meetingId} />
        
        <Button
          onClick={toggleAudio}
          variant={isAudioEnabled ? "outline" : "destructive"}
          size="icon"
          className={`rounded-full h-12 w-12 transition-all duration-200 ${
            isAudioEnabled 
              ? 'bg-white hover:bg-gray-100 border-gray-300' 
              : 'bg-red-500 hover:bg-red-600 text-white border-red-500'
          }`}
          title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
        >
          {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button
          onClick={toggleVideo}
          variant={isVideoEnabled ? "outline" : "destructive"}
          size="icon"
          className={`rounded-full h-12 w-12 transition-all duration-200 ${
            isVideoEnabled 
              ? 'bg-white hover:bg-gray-100 border-gray-300' 
              : 'bg-red-500 hover:bg-red-600 text-white border-red-500'
          }`}
          title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
        >
          {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button
          onClick={toggleScreenSharing}
          variant={isScreenSharing ? "destructive" : "outline"}
          size="icon"
          className={`rounded-full h-12 w-12 transition-all duration-200 ${
            !isScreenSharing 
              ? 'bg-white hover:bg-gray-100 border-gray-300' 
              : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
          }`}
          title={isScreenSharing ? 'Stop screen sharing' : 'Share screen'}
        >
          {isScreenSharing ? <ScreenShareOff className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
        </Button>
        
        <Reactions />
        
        <PreviewOptions />
        
        {isHost && <HostTools isHost={isHost} />}
        
        <Button
          onClick={leaveMeeting}
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600 transition-all duration-200"
          title="Leave meeting"
        >
          <Phone className="rotate-[135deg] h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;