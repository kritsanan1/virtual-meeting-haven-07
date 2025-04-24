import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import ControlPanel from '@/components/ControlPanel';
import { useToast } from '@/hooks/use-toast';
import { useMediaStream } from '@/hooks/use-media-stream';
import ParticipantInfo from '@/components/ParticipantInfo';
import { Chat } from '@/components/Chat';
import HostTools from '@/components/HostTools';
import Reactions from '@/components/Reactions';

const Meeting = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState<{ id: string; name: string; isLocal: boolean }[]>([]);
  
  const { 
    localStream, 
    isAudioEnabled, 
    isVideoEnabled, 
    isScreenSharing,
    toggleAudio, 
    toggleVideo, 
    toggleScreenSharing,
    error
  } = useMediaStream();

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
    
    // Add local participant
    setParticipants([{ id: 'local', name: userName, isLocal: true }]);
    
    // Simulate another participant joining (for demo)
    setTimeout(() => {
      setParticipants(prev => [
        ...prev, 
        { id: 'remote-1', name: 'Demo User', isLocal: false }
      ]);
      
      toast({
        title: "User joined",
        description: "Demo User joined the meeting",
      });
    }, 2000);
    
  }, [location.search, navigate, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Media Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const leaveMeeting = () => {
    navigate('/');
    toast({
      title: "Left Meeting",
      description: "You have successfully left the meeting",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with meeting info */}
      <header className="bg-white shadow-sm py-3 px-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg text-meeting-dark">Meeting: {id}</h2>
          <p className="text-sm text-gray-500">Joined as {name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Chat userName={name} />
          <ParticipantInfo participants={participants} />
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={leaveMeeting}
          >
            Leave
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="h-full flex flex-col">
          {/* Video grid */}
          <div className="flex-1 meeting-grid">
            <VideoPlayer 
              stream={localStream}
              isVideoEnabled={isVideoEnabled} 
              isAudioEnabled={isAudioEnabled}
              isLocal={true}
              name={name}
            />
            
            {/* Demo remote participant */}
            <div className="video-container bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-meeting-primary rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-semibold">D</span>
                </div>
                <p className="mt-2">Demo User</p>
              </div>
            </div>
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
