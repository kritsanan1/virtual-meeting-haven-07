import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import ControlPanel from '@/components/ControlPanel';
import { useToast } from '@/hooks/use-toast';
import { useTwilioVideo } from '@/hooks/use-twilio-video';
import ParticipantInfo from '@/components/ParticipantInfo';
import { Chat } from '@/components/Chat';

const Meeting = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [name, setName] = useState('');

  const {
    participants,
    localParticipant,
    isConnecting,
    isConnected,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    error,
    disconnectFromRoom,
    toggleAudio,
    toggleVideo,
    toggleScreenSharing,
  } = useTwilioVideo({
    roomName: id || '',
    userName: name,
  });

  const [isHost] = useState(true); // For demo purposes, we'll assume the user is a host

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get('name');
    
    if (!userName) {
      toast({
        title: "Error",
        description: "Name is required to join meeting",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    setName(userName);
  }, [location.search, navigate, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Meeting Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const leaveMeeting = () => {
    disconnectFromRoom();
    navigate('/');
    toast({
      title: "Left Meeting",
      description: "You have successfully left the meeting",
    });
  };

  // Convert participants for ParticipantInfo component
  const participantInfoData = participants.map(participant => ({
    id: participant.sid,
    name: participant.identity,
    isLocal: participant.isLocal
  }));

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meeting-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-meeting-dark mb-2">Connecting to meeting...</h2>
          <p className="text-gray-500">Please wait while we connect you to {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header with meeting info */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-xl text-meeting-dark">
              Meeting: {id}
              {isConnected && <span className="ml-2 text-green-600 text-sm">● Connected</span>}
              {!isConnected && <span className="ml-2 text-red-600 text-sm">● Disconnected</span>}
            </h2>
            <p className="text-sm text-gray-500">
              Joined as {name} • {participants.length} participant{participants.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Chat userName={name} />
            <ParticipantInfo participants={participantInfoData} />
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={leaveMeeting}
              className="font-medium"
            >
              Leave
            </Button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="h-full flex flex-col">
          {/* Video grid */}
          <div className="flex-1 meeting-grid">
            {participants.map((participant) => (
              <VideoPlayer
                key={participant.sid}
                participant={participant}
                isLocal={participant.isLocal}
              />
            ))}
            
            {/* Show placeholder if no participants */}
            {participants.length === 0 && (
              <div className="video-container bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-meeting-primary rounded-full mx-auto flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-lg">Waiting for connection...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Control panel */}
      <ControlPanel 
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        isScreenSharing={isScreenSharing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        toggleScreenSharing={toggleScreenSharing}
        leaveMeeting={leaveMeeting}
        isHost={isHost}
      />
    </div>
  );
};

export default Meeting;