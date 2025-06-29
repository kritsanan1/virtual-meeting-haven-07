import { useState, useEffect, useCallback, useRef } from 'react';
import { connect, createLocalTracks, LocalTrack, Room, RemoteParticipant, LocalParticipant, RemoteTrack, LocalVideoTrack, LocalAudioTrack } from 'twilio-video';
import { useToast } from '@/hooks/use-toast';
import { TwilioTokenResponse } from '@/types/twilio';

interface UseTwilioVideoProps {
  roomName: string;
  userName: string;
}

interface ParticipantData {
  sid: string;
  identity: string;
  isLocal: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  tracks: Map<string, any>;
}

export function useTwilioVideo({ roomName, userName }: UseTwilioVideoProps) {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<Map<string, ParticipantData>>(new Map());
  const [localTracks, setLocalTracks] = useState<LocalTrack[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const { toast } = useToast();
  const roomRef = useRef<Room | null>(null);
  const localTracksRef = useRef<LocalTrack[]>([]);
  const screenTrackRef = useRef<LocalVideoTrack | null>(null);

  // Fetch access token from backend
  const getAccessToken = async (): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: userName,
          room: roomName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
      }

      const data: TwilioTokenResponse = await response.json();
      return data.token;
    } catch (err) {
      console.error('Error fetching access token:', err);
      throw new Error('Failed to get access token. Please check if the backend server is running.');
    }
  };

  // Create participant data object
  const createParticipantData = (participant: LocalParticipant | RemoteParticipant, isLocal: boolean): ParticipantData => {
    const audioTrack = Array.from(participant.audioTracks.values())[0];
    const videoTrack = Array.from(participant.videoTracks.values())[0];

    return {
      sid: participant.sid,
      identity: participant.identity,
      isLocal,
      audioEnabled: audioTrack ? audioTrack.track?.isEnabled ?? false : false,
      videoEnabled: videoTrack ? videoTrack.track?.isEnabled ?? false : false,
      tracks: participant.tracks,
    };
  };

  // Update participants state
  const updateParticipants = useCallback((room: Room) => {
    const participantMap = new Map<string, ParticipantData>();
    
    // Add local participant
    const localParticipantData = createParticipantData(room.localParticipant, true);
    participantMap.set(room.localParticipant.sid, localParticipantData);

    // Add remote participants
    room.participants.forEach((participant) => {
      const participantData = createParticipantData(participant, false);
      participantMap.set(participant.sid, participantData);
    });

    setParticipants(participantMap);
  }, []);

  // Handle participant connected
  const handleParticipantConnected = useCallback((participant: RemoteParticipant) => {
    console.log('Participant connected:', participant.identity);
    
    toast({
      title: "Participant joined",
      description: `${participant.identity} joined the meeting`,
    });

    if (roomRef.current) {
      updateParticipants(roomRef.current);
    }

    // Handle track subscriptions
    participant.tracks.forEach((publication) => {
      if (publication.track) {
        console.log('Track subscribed:', publication.track);
      }
    });

    participant.on('trackSubscribed', (track: RemoteTrack) => {
      console.log('Track subscribed:', track);
      if (roomRef.current) {
        updateParticipants(roomRef.current);
      }
    });

    participant.on('trackUnsubscribed', (track: RemoteTrack) => {
      console.log('Track unsubscribed:', track);
      if (roomRef.current) {
        updateParticipants(roomRef.current);
      }
    });
  }, [updateParticipants, toast]);

  // Handle participant disconnected
  const handleParticipantDisconnected = useCallback((participant: RemoteParticipant) => {
    console.log('Participant disconnected:', participant.identity);
    
    toast({
      title: "Participant left",
      description: `${participant.identity} left the meeting`,
    });

    if (roomRef.current) {
      updateParticipants(roomRef.current);
    }
  }, [updateParticipants, toast]);

  // Connect to Twilio room
  const connectToRoom = useCallback(async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setError(null);

    try {
      // Get access token
      const token = await getAccessToken();

      // Create local tracks
      const tracks = await createLocalTracks({
        audio: true,
        video: { width: 1280, height: 720 }
      });

      setLocalTracks(tracks);
      localTracksRef.current = tracks;

      // Connect to room
      const connectedRoom = await connect(token, {
        name: roomName,
        tracks,
        maxAudioBitrate: 16000,
        maxVideoBitrate: 2500000,
        preferredVideoCodecs: ['VP8', 'H264'],
        networkQuality: { local: 1, remote: 1 }
      });

      setRoom(connectedRoom);
      roomRef.current = connectedRoom;
      setIsConnected(true);

      // Set up event listeners
      connectedRoom.on('participantConnected', handleParticipantConnected);
      connectedRoom.on('participantDisconnected', handleParticipantDisconnected);

      connectedRoom.on('disconnected', (room: Room) => {
        console.log('Disconnected from room:', room.name);
        setIsConnected(false);
        setRoom(null);
        roomRef.current = null;
        
        // Clean up local tracks
        localTracksRef.current.forEach(track => track.stop());
        setLocalTracks([]);
        localTracksRef.current = [];
        
        setParticipants(new Map());
      });

      connectedRoom.on('reconnecting', () => {
        console.log('Reconnecting to room...');
        toast({
          title: "Reconnecting",
          description: "Attempting to reconnect to the meeting...",
        });
      });

      connectedRoom.on('reconnected', () => {
        console.log('Reconnected to room');
        toast({
          title: "Reconnected",
          description: "Successfully reconnected to the meeting",
        });
      });

      // Update participants
      updateParticipants(connectedRoom);

      toast({
        title: "Connected",
        description: `Successfully joined meeting: ${roomName}`,
      });

    } catch (err) {
      console.error('Error connecting to room:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to meeting');
      toast({
        title: "Connection failed",
        description: err instanceof Error ? err.message : 'Failed to connect to meeting',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [roomName, userName, isConnecting, isConnected, handleParticipantConnected, handleParticipantDisconnected, updateParticipants, toast]);

  // Disconnect from room
  const disconnectFromRoom = useCallback(() => {
    if (roomRef.current) {
      roomRef.current.disconnect();
    }
    
    // Stop screen sharing if active
    if (screenTrackRef.current) {
      screenTrackRef.current.stop();
      screenTrackRef.current = null;
      setIsScreenSharing(false);
    }
  }, []);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    const audioTrack = localTracksRef.current.find(track => track.kind === 'audio') as LocalAudioTrack;
    if (audioTrack) {
      if (isAudioEnabled) {
        audioTrack.disable();
      } else {
        audioTrack.enable();
      }
      setIsAudioEnabled(!isAudioEnabled);
      
      // Update participants state
      if (roomRef.current) {
        updateParticipants(roomRef.current);
      }
    }
  }, [isAudioEnabled, updateParticipants]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    const videoTrack = localTracksRef.current.find(track => track.kind === 'video') as LocalVideoTrack;
    if (videoTrack) {
      if (isVideoEnabled) {
        videoTrack.disable();
      } else {
        videoTrack.enable();
      }
      setIsVideoEnabled(!isVideoEnabled);
      
      // Update participants state
      if (roomRef.current) {
        updateParticipants(roomRef.current);
      }
    }
  }, [isVideoEnabled, updateParticipants]);

  // Toggle screen sharing
  const toggleScreenSharing = useCallback(async () => {
    if (!roomRef.current) return;

    try {
      if (isScreenSharing && screenTrackRef.current) {
        // Stop screen sharing
        await roomRef.current.localParticipant.unpublishTrack(screenTrackRef.current);
        screenTrackRef.current.stop();
        screenTrackRef.current = null;
        setIsScreenSharing(false);
        
        toast({
          title: "Screen sharing stopped",
          description: "You stopped sharing your screen",
        });
      } else {
        // Start screen sharing
        const screenTrack = await createLocalTracks({
          video: {
            // @ts-ignore - TypeScript doesn't recognize getDisplayMedia constraints
            mediaSource: 'screen'
          }
        });

        const videoTrack = screenTrack.find(track => track.kind === 'video') as LocalVideoTrack;
        if (videoTrack) {
          await roomRef.current.localParticipant.publishTrack(videoTrack);
          screenTrackRef.current = videoTrack;
          setIsScreenSharing(true);

          // Handle screen share ending
          videoTrack.mediaStreamTrack.onended = () => {
            setIsScreenSharing(false);
            screenTrackRef.current = null;
          };

          toast({
            title: "Screen sharing started",
            description: "You are now sharing your screen",
          });
        }
      }
    } catch (err) {
      console.error('Error toggling screen share:', err);
      toast({
        title: "Screen sharing error",
        description: "Failed to toggle screen sharing",
        variant: "destructive",
      });
    }
  }, [isScreenSharing, toast]);

  // Auto-connect when component mounts
  useEffect(() => {
    connectToRoom();

    // Cleanup on unmount
    return () => {
      disconnectFromRoom();
    };
  }, []);

  // Get local participant
  const localParticipant = participants.get(room?.localParticipant?.sid || '');

  return {
    room,
    participants: Array.from(participants.values()),
    localParticipant,
    localTracks,
    isConnecting,
    isConnected,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    error,
    connectToRoom,
    disconnectFromRoom,
    toggleAudio,
    toggleVideo,
    toggleScreenSharing,
  };
}