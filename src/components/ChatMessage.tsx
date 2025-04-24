import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Reply } from 'lucide-react';
import { Message } from '@/types/chat';
import InlineReplyBox from './InlineReplyBox';

interface ChatMessageProps {
  message: Message;
  isUserMessage: boolean;
  onReply: (message: Message) => void;
  replyingTo: Message | null;
  onSendReply: (content: string) => void;
  onCancelReply: () => void;
}

const ChatMessage = ({
  message,
  isUserMessage,
  onReply,
  replyingTo,
  onSendReply,
  onCancelReply
}: ChatMessageProps) => {
  const isReplying = replyingTo?.id === message.id;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-meeting-primary text-white">
            {message.sender[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {isUserMessage ? "You" : message.sender} to {message.recipient === 'everyone' ? 'Everyone' : message.recipient}
            </span>
            <span className="text-sm text-gray-500">
              {message.timestamp.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit'
              })}
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
            className="mt-1 text-blue-600 hover:text-blue-700 p-0 h-auto font-normal hover:bg-transparent cursor-pointer"
            onClick={() => onReply(message)}
          >
            <Reply className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
      </div>

      {isReplying && (
        <InlineReplyBox
          onSend={onSendReply}
          onCancel={onCancelReply}
          recipient={message.sender}
        />
      )}

      {message.replies?.map(reply => (
        <div key={reply.id} className="ml-8 flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-meeting-primary text-white">
              {reply.sender[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">
                {isUserMessage ? "You" : reply.sender} to {reply.recipient === 'everyone' ? 'Everyone' : reply.recipient}
              </span>
              <span className="text-sm text-gray-500">
                {reply.timestamp.toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
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
  );
};

export default ChatMessage;
