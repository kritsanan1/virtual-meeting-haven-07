
import React, { useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VideoPlayerProps {
  stream: MediaStream | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isLocal: boolean;
  name: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  stream,
  isVideoEnabled,
  isAudioEnabled,
  isLocal,
  name,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="video-container bg-gray-800 relative shadow-lg">
      {stream && isVideoEnabled ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted={isLocal} // Mute local video to prevent feedback
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="w-20 h-20 bg-meeting-primary rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-white">{firstLetter}</span>
          </div>
        </div>
      )}

      {/* Name badge and audio indicator */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <div className="bg-black bg-opacity-40 text-white text-sm px-2 py-1 rounded">
          {name} {isLocal && "(You)"}
        </div>
        <div className="bg-black bg-opacity-40 p-1 rounded-full">
          {isAudioEnabled ? (
            <Mic size={16} className="text-white" />
          ) : (
            <MicOff size={16} className="text-meeting-danger" />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
