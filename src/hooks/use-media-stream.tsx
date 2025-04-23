
import { useState, useEffect, useCallback } from 'react';

export function useMediaStream() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize media stream
  useEffect(() => {
    async function setupMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setLocalStream(stream);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError("Could not access camera or microphone. Please check your permissions.");
        // Try to get at least audio
        try {
          const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
          });
          setLocalStream(audioOnlyStream);
          setIsVideoEnabled(false);
        } catch (audioErr) {
          console.error("Error accessing audio:", audioErr);
          setError("Could not access microphone. Please check your permissions.");
        }
      }
    }

    setupMediaStream();

    // Cleanup function
    return () => {
      localStream?.getTracks().forEach(track => {
        track.stop();
      });
      screenStream?.getTracks().forEach(track => {
        track.stop();
      });
    };
  }, []);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      const enabled = !isAudioEnabled;
      
      audioTracks.forEach(track => {
        track.enabled = enabled;
      });
      
      setIsAudioEnabled(enabled);
    }
  }, [localStream, isAudioEnabled]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      const enabled = !isVideoEnabled;
      
      videoTracks.forEach(track => {
        track.enabled = enabled;
      });
      
      setIsVideoEnabled(enabled);
    }
  }, [localStream, isVideoEnabled]);

  // Toggle screen sharing
  const toggleScreenSharing = useCallback(async () => {
    if (isScreenSharing && screenStream) {
      screenStream.getTracks().forEach(track => {
        track.stop();
      });
      setScreenStream(null);
      setIsScreenSharing(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      
      setScreenStream(stream);
      setIsScreenSharing(true);

      // Add listener for when user stops screen sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false);
        setScreenStream(null);
      };
    } catch (err) {
      console.error("Error sharing screen:", err);
      setError("Could not share screen. Please check your permissions.");
    }
  }, [isScreenSharing, screenStream]);

  // Return the current displayed stream (either localStream or screenStream)
  const displayStream = isScreenSharing && screenStream ? screenStream : localStream;

  return {
    localStream: displayStream,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    toggleAudio,
    toggleVideo,
    toggleScreenSharing,
    error
  };
}
