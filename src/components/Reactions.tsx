
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart } from 'lucide-react';

const Reactions = () => {
  const { toast } = useToast();

  const sendReaction = (reaction: string) => {
    toast({
      title: "Reaction Sent",
      description: `You sent ${reaction}`,
      duration: 1500,
    });
  };

  const effectReactions = [
    { emoji: "🎈", label: "Balloon" },
    { emoji: "🚀", label: "Rocket" },
    { emoji: "👍", label: "Thumbs Up" },
    { emoji: "😂", label: "Joy" },
    { emoji: "🎉", label: "Party" },
    { emoji: "❤️", label: "Heart" },
  ];

  const quickReactions = [
    { emoji: "👏", label: "Clap" },
    { emoji: "👍", label: "Like" },
    { emoji: "❤️", label: "Heart" },
    { emoji: "😂", label: "Joy" },
    { emoji: "😮", label: "Wow" },
    { emoji: "🎉", label: "Party" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 bg-white hover:bg-gray-100 flex items-center justify-center"
        >
          <Heart className="h-5 w-5 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] bg-[#1c1c1c] border-gray-700">
        <div className="p-2 space-y-4">
          <div>
            <DropdownMenuLabel className="text-gray-300 px-2">Send with effect</DropdownMenuLabel>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {effectReactions.map((reaction) => (
                <Button
                  key={reaction.label}
                  variant="ghost"
                  className="flex items-center justify-center p-2 h-10 w-10 rounded-lg hover:bg-gray-800"
                  onClick={() => sendReaction(reaction.emoji)}
                >
                  <span className="text-xl">{reaction.emoji}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <DropdownMenuLabel className="text-gray-300 px-2">Reactions</DropdownMenuLabel>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {quickReactions.map((reaction) => (
                <Button
                  key={reaction.label}
                  variant="ghost"
                  className="flex items-center justify-center p-2 h-10 w-10 rounded-lg hover:bg-gray-800"
                  onClick={() => sendReaction(reaction.emoji)}
                >
                  <span className="text-xl">{reaction.emoji}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <Button
            variant="secondary"
            className="w-full gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300"
            onClick={() => sendReaction("✋")}
          >
            <span className="text-xl">✋</span>
            <span>Raise hand</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Reactions;
