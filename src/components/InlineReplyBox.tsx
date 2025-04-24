
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X, Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InlineReplyBoxProps {
  onSend: (content: string) => void;
  onCancel: () => void;
  recipient: string;
}

const InlineReplyBox = ({ onSend, onCancel, recipient }: InlineReplyBoxProps) => {
  const [replyContent, setReplyContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const timerRef = React.useRef<number | null>(null);
  const { toast } = useToast();

  const formatRecordingTime = () => {
    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
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
        
        onSend(audioUrl);
        setIsRecording(false);
        setRecordingTime(0);
        
        stream.getTracks().forEach(track => track.stop());
        
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow access to your microphone in your browser settings and try again.",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onSend(replyContent);
      setReplyContent('');
    }
  };

  React.useEffect(() => {
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

  return (
    <div className="ml-8 mt-2 mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-sm text-gray-500 mb-2 px-2">
            Replying to {recipient}
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 bg-transparent border-0 shadow-none focus-visible:ring-0"
              disabled={isRecording}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`text-gray-500 ${isRecording ? 'bg-red-100' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            {isRecording && (
              <span className="text-red-500 text-xs animate-pulse">
                {formatRecordingTime()}
              </span>
            )}
            <Button
              type="submit"
              size="icon"
              className="bg-meeting-primary hover:bg-meeting-primary/90"
              disabled={isRecording || !replyContent.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-gray-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InlineReplyBox;
