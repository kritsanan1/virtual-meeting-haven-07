import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, PenLine, X, MoreVertical, Mic, MicOff, Save, Trash } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { ChatProps, Message } from '@/types/chat';
import { useChat } from '@/hooks/use-chat';
import ChatMessage from './ChatMessage';
export const Chat: React.FC<ChatProps> = ({
  userName
}) => {
  const {
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
  } = useChat(userName);
  const [isEditing, setIsEditing] = React.useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const handleEditMessage = () => {
    setIsEditing(!isEditing);
  };
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !isRecording) return;
    const message: Message = {
      id: Date.now().toString(),
      sender: userName,
      recipient: recipient,
      content: newMessage,
      timestamp: new Date(),
      replyTo: replyingTo?.id,
      replies: []
    };
    setMessages(prev => {
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
  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been removed"
    });
  };
  const saveChat = () => {
    const chatContent = messages.map(msg => {
      const time = msg.timestamp.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      });
      return `[${time}] ${msg.sender} to ${msg.recipient}: ${msg.content}`;
    }).join('\n');
    const blob = new Blob([chatContent], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Chat saved",
      description: "Chat history has been downloaded"
    });
  };
  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };
  return <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative hover:bg-meeting-primary/10 transition-colors">
          <MessageCircle className="h-5 w-5 text-meeting-primary" />
          {messages.length > 0 && <span className="absolute -top-1 -right-1 bg-meeting-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {messages.length}
            </span>}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-0 max-h-[90vh]">
        <DrawerHeader className="border-b px-4 py-2 bg-white">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-gray-800">
              Meeting Chat
            </DrawerTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={clearChat}>
                    <Trash className="h-4 w-4 mr-2" />
                    Clear chat
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={saveChat}>
                    <Save className="h-4 w-4 mr-2" />
                    Save chat
                  </DropdownMenuItem>
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
              {messages.map(message => <ChatMessage key={message.id} message={message} isUserMessage={message.sender === userName} onReply={handleReply} replyingTo={replyingTo} onSendReply={content => {
              const reply: Message = {
                id: Date.now().toString(),
                sender: userName,
                recipient: message.sender,
                content,
                timestamp: new Date(),
                replyTo: message.id
              };
              setMessages(prev => {
                const newMessages = [...prev];
                const parentMessage = newMessages.find(m => m.id === message.id);
                if (parentMessage) {
                  parentMessage.replies = [...(parentMessage.replies || []), reply];
                }
                return newMessages;
              });
              setReplyingTo(null);
            }} onCancelReply={() => setReplyingTo(null)} />)}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-white">
            <div className="bg-gray-50 rounded-lg p-2 py-[15px] px-0">
              <div className="mb-2 px-0">
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger className="w-[140px] h-8 text-sm px-[9px]">
                    <SelectValue placeholder="To: Everyone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="host">Host</SelectItem>
                    <SelectItem value="participants">All Participants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <form onSubmit={sendMessage} className="flex flex-col gap-2">
                {isEditing ? <Textarea placeholder="Type message here..." value={newMessage} onChange={e => setNewMessage(e.target.value)} className="bg-transparent border-0 shadow-none focus-visible:ring-0 px-2 text-gray-700 min-h-[80px]" disabled={isRecording} /> : <Input placeholder="Type message here..." value={newMessage} onChange={e => setNewMessage(e.target.value)} className="bg-transparent border-0 shadow-none focus-visible:ring-0 px-2 text-gray-700" disabled={isRecording} />}
                <div className="flex items-center justify-between px-2">
                  <div className="flex gap-2 items-center">
                    <Button type="button" variant="ghost" size="icon" className="text-gray-500" onClick={handleEditMessage} disabled={isRecording}>
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className={`text-gray-500 ${isRecording ? 'bg-red-100' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    {isRecording && <span className="text-red-500 text-xs animate-pulse">
                        Recording {formatRecordingTime()}
                      </span>}
                  </div>
                  <Button type="submit" size="icon" className="bg-meeting-primary hover:bg-meeting-primary/90" disabled={isRecording || !newMessage.trim() && !isRecording}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>;
};