
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X, Mic, MicOff } from 'lucide-react';

interface InlineReplyBoxProps {
  onSend: (content: string) => void;
  onCancel: () => void;
  recipient: string;
}

const InlineReplyBox = ({ onSend, onCancel, recipient }: InlineReplyBoxProps) => {
  const [replyContent, setReplyContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onSend(replyContent);
      setReplyContent('');
    }
  };

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
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`text-gray-500 ${isRecording ? 'bg-red-100' : ''}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="submit"
              size="icon"
              className="bg-meeting-primary hover:bg-meeting-primary/90"
              disabled={!replyContent.trim()}
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
