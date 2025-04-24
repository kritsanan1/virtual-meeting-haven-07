
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, PenLine, Square, ExternalLink, X, MoreVertical, Reply, Mic, MicOff } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  replyTo?: string;
  replies?: Message[];
  isAudio?: boolean;
}

interface ChatProps {
  userName: string;
}

export const Chat: React.FC<ChatProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Clean up on unmount
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
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
      };

      mediaRecorder.onerror = (event) => {
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
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please grant permission to use your microphone or check if your device has one connected.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
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

  const handleEditMessage = () => {
    setIsEditing(!isEditing);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: userName,
      content: newMessage,
      timestamp: new Date(),
      replyTo: replyingTo?.id,
      replies: [],
    };

    setMessages((prev) => {
      const newMessages = [...prev];
      if (replyingTo) {
        const parentMessage = newMessages.find(m => m.id === replyingTo.id);
        if (parentMessage) {
          parentMessage.replies = [...(parentMessage.replies || []), message];
        }
        return newMessages;
      }
      return [...prev, message];
    });
    
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const openInNewWindow = () => {
    const width = 400;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open('', 'Chat', `width=${width},height=${height},left=${left},top=${top}`);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative hover:bg-meeting-primary/10 transition-colors"
        >
          <MessageCircle className="h-5 w-5 text-meeting-primary" />
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-meeting-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {messages.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 max-h-[90vh]">
        <DrawerHeader className="border-b px-4 py-2 bg-white">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-gray-800">
              Meeting Chat
            </DrawerTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-500" onClick={openInNewWindow}>
                <ExternalLink className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Clear chat</DropdownMenuItem>
                  <DropdownMenuItem>Save chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-meeting-primary text-white">
                        {message.sender[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          You to Everyone
                        </span>
                        <span className="text-sm text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                      {message.isAudio ? (
                        <div className="mt-2">
                          <audio src={message.content} controls className="w-full max-w-[250px] h-10" />
                        </div>
                      ) : (
                        <p className="mt-1 text-gray-700">{message.content}</p>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1 text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
                        onClick={() => handleReply(message)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                  {message.replies?.map((reply) => (
                    <div key={reply.id} className="ml-8 flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-meeting-primary text-white">
                          {reply.sender[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            You to Everyone
                          </span>
                          <span className="text-sm text-gray-500">
                            {reply.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                        {reply.isAudio ? (
                          <div className="mt-2">
                            <audio src={reply.content} controls className="w-full max-w-[250px] h-10" />
                          </div>
                        ) : (
                          <p className="mt-1 text-gray-700">{reply.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-white">
            <div className="bg-gray-50 rounded-lg p-2">
              {replyingTo && (
                <div className="mb-2 px-2 py-1 bg-gray-100 rounded flex items-center justify-between">
                  <span className="text-sm text-gray-600">Replying to message</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => setReplyingTo(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="mb-2 px-2">
                <span className="text-sm text-gray-600">To: Everyone</span>
              </div>
              <form onSubmit={sendMessage} className="flex flex-col gap-2">
                {isEditing ? (
                  <Textarea
                    placeholder="Type message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-transparent border-0 shadow-none focus-visible:ring-0 px-2 text-gray-700 min-h-[80px]"
                    disabled={isRecording}
                  />
                ) : (
                  <Input
                    placeholder="Type message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-transparent border-0 shadow-none focus-visible:ring-0 px-2 text-gray-700"
                    disabled={isRecording}
                  />
                )}
                <div className="flex items-center justify-between px-2">
                  <div className="flex gap-2 items-center">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500"
                      onClick={handleEditMessage}
                      disabled={isRecording}
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className={`text-gray-500 ${isRecording ? 'bg-red-100' : ''}`}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    {isRecording && (
                      <span className="text-red-500 text-xs animate-pulse">
                        Recording {formatRecordingTime()}
                      </span>
                    )}
                  </div>
                  <Button 
                    type="submit"
                    size="icon"
                    className="bg-meeting-primary hover:bg-meeting-primary/90"
                    disabled={isRecording || (!newMessage.trim().length && !isRecording)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
