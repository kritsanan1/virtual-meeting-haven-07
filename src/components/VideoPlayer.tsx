import React, { useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface ParticipantData {
  sid: string;
  identity: string;
  isLocal: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  tracks: Map<string, any>;
}

interface VideoPlayerProps {
  participant: ParticipantData;
  isLocal: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  participant,
  isLocal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!participant.tracks) return;

    const videoTrackPublication = Array.from(participant.tracks.values()).find(
      (trackPublication: any) => trackPublication.track && trackPublication.track.kind === 'video'
    );

    const audioTrackPublication = Array.from(participant.tracks.values()).find(
      (trackPublication: any) => trackPublication.track && trackPublication.track.kind === 'audio'
    );

    // Attach video track
    if (videoTrackPublication && videoTrackPublication.track && videoRef.current) {
      const videoTrack = videoTrackPublication.track;
      videoTrack.attach(videoRef.current);
      
      return () => {
        videoTrack.detach();
      };
    }

    // Attach audio track (only for remote participants)
    if (!isLocal && audioTrackPublication && audioTrackPublication.track && audioRef.current) {
      const audioTrack = audioTrackPublication.track;
      audioTrack.attach(audioRef.current);
      
      return () => {
        audioTrack.detach();
      };
    }
  }, [participant.tracks, isLocal]);

  const firstLetter = participant.identity.charAt(0).toUpperCase();
  const hasVideoTrack = Array.from(participant.tracks.values()).some(
    (trackPublication: any) => trackPublication.track && trackPublication.track.kind === 'video' && trackPublication.track.isEnabled
  );

  return (
    <div className="video-container bg-gray-800 relative shadow-lg">
      {hasVideoTrack && participant.videoEnabled ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted={isLocal} // Mute local video to prevent feedback
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="w-20 h-20 bg-meeting-primary rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-white">{firstLetter}</span>
          </div>
        </div>
      )}

      {/* Audio element for remote participants */}
      {!isLocal && (
        <audio ref={audioRef} autoPlay />
      )}

      {/* Name badge and status indicators */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <div className="bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
          {participant.identity} {isLocal && "(You)"}
        </div>
        <div className="flex gap-2">
          {/* Audio indicator */}
          <div className={`p-2 rounded-full ${participant.audioEnabled ? 'bg-green-600' : 'bg-red-600'} bg-opacity-80`}>
            {participant.audioEnabled ? (
              <Mic size={14} className="text-white" />
            ) : (
              <MicOff size={14} className="text-white" />
            )}
          </div>
          
          {/* Video indicator */}
          <div className={`p-2 rounded-full ${participant.videoEnabled ? 'bg-green-600' : 'bg-red-600'} bg-opacity-80`}>
            {participant.videoEnabled ? (
              <Video size={14} className="text-white" />
            ) : (
              <VideoOff size={14} className="text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;