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
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error accessing media devices:", err);
        
        // Handle specific error types
        if (err instanceof DOMException) {
          switch (err.name) {
            case 'NotFoundError':
              setError("No microphone or camera detected. Please connect a microphone and camera, then refresh the page.");
              break;
            case 'NotAllowedError':
              setError("Camera and microphone access denied. Please allow permissions and refresh the page.");
              break;
            case 'NotReadableError':
              setError("Camera or microphone is already in use by another application. Please close other applications and try again.");
              break;
            default:
              setError("Could not access camera or microphone. Please check your permissions and devices.");
          }
        } else {
          setError("Could not access camera or microphone. Please check your permissions and devices.");
        }

        // Try to get at least audio
        try {
          const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
          });
          setLocalStream(audioOnlyStream);
          setIsVideoEnabled(false);
          setError(null); // Clear error if audio-only succeeds
        } catch (audioErr) {
          console.error("Error accessing audio:", audioErr);
          
          // Handle specific audio error types
          if (audioErr instanceof DOMException) {
            switch (audioErr.name) {
              case 'NotFoundError':
                setError("No microphone detected. Please connect a microphone and refresh the page to join the meeting with audio.");
                break;
              case 'NotAllowedError':
                setError("Microphone access denied. Please allow microphone permissions and refresh the page.");
                break;
              case 'NotReadableError':
                setError("Microphone is already in use by another application. Please close other applications and try again.");
                break;
              default:
                setError("Could not access microphone. Please check your permissions and device.");
            }
          } else {
            setError("Could not access microphone. Please check your permissions and device.");
          }
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
      
      // Handle specific screen sharing error types
      if (err instanceof DOMException) {
        switch (err.name) {
          case 'NotAllowedError':
            setError("Screen sharing permission denied. Please allow screen sharing to continue.");
            break;
          case 'NotFoundError':
            setError("No screen available for sharing.");
            break;
          default:
            setError("Could not share screen. Please check your permissions.");
        }
      } else {
        setError("Could not share screen. Please check your permissions.");
      }
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