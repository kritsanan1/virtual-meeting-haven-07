
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/types/chat';

export const useChat = (userName: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recipient, setRecipient] = useState('everyone');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Browser Not Supported",
        description: "Your browser doesn't support audio recording. Please try a modern browser like Chrome or Firefox.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (audioChunksRef.current.length === 0) {
          toast({
            title: "Recording Error",
            description: "No audio data was captured. Please try again.",
            variant: "destructive"
          });
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const message: Message = {
          id: Date.now().toString(),
          sender: userName,
          recipient: recipient,
          content: audioUrl,
          timestamp: new Date(),
          replyTo: replyingTo?.id,
          replies: [],
          isAudio: true
        };

        setMessages(prev => {
          const newMessages = [...prev];
          if (replyingTo) {
            const parentMessage = newMessages.find(m => m.id === replyingTo.id);
            if (parentMessage) {
              parentMessage.replies = [...(parentMessage.replies || []), message];
              return newMessages;
            }
          }
          return [...prev, message];
        });

        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsRecording(false);
      };

      mediaRecorder.onerror = event => {
        console.error("MediaRecorder error:", event);
        toast({
          title: "Recording Error",
          description: "An error occurred while recording. Please try again.",
          variant: "destructive"
        });
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);

    } catch (error: any) {
      console.error('Error accessing microphone:', error);
      
      let errorMessage = "Please grant permission to use your microphone or check if your device has one connected.";
      
      // Provide more specific error messages based on the error
      if (error.name === "NotAllowedError") {
        errorMessage = "Microphone access was denied. Please allow microphone access in your browser settings and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No microphone detected. Please connect a microphone and try again.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Your microphone is busy or not functioning properly. Please try again later.";
      }
      
      toast({
        title: "Microphone Access Error",
        description: errorMessage,
        variant: "destructive"
      });
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error('Error stopping recording:', error);
        toast({
          title: "Recording Error",
          description: "Failed to stop recording. Please try again.",
          variant: "destructive"
        });
        setIsRecording(false);
      }
    }
  };

  const formatRecordingTime = () => {
    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    replyingTo,
    setReplyingTo,
    isRecording,
    recipient,
    setRecipient,
    startRecording,
    stopRecording,
    formatRecordingTime
  };
};
