
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface ChatProps {
  userName: string;
}

export const Chat: React.FC<ChatProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: userName,
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
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
            <span className="absolute -top-1 -right-1 bg-meeting-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
              {messages.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <DrawerHeader className="border-b bg-gradient-to-r from-meeting-primary/10 to-transparent px-4 py-3">
          <DrawerTitle className="text-lg font-semibold text-meeting-dark flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-meeting-primary" />
            Chat
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col h-[70vh]">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.sender === userName ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm ${
                      message.sender === userName
                        ? 'bg-meeting-primary text-white rounded-tr-sm'
                        : 'bg-gray-100 rounded-tl-sm'
                    } animate-fade-in`}
                  >
                    <p className={`text-xs font-medium mb-1 ${
                      message.sender === userName
                        ? 'text-white/90'
                        : 'text-meeting-dark/60'
                    }`}>
                      {message.sender}
                    </p>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] mt-1 ${
                      message.sender === userName
                        ? 'text-white/70'
                        : 'text-meeting-dark/40'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-white">
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-gray-50 border-meeting-primary/20 focus-visible:ring-meeting-primary"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-meeting-primary hover:bg-meeting-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

