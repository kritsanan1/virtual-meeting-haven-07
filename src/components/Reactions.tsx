
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Balloon, Rocket, ThumbsUp, PartyPopper, Heart, Hand } from 'lucide-react';

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
    { icon: Balloon, label: "🎈 Balloon" },
    { icon: Rocket, label: "🚀 Rocket" },
    { icon: ThumbsUp, label: "👍 Thumbs Up" },
    { icon: PartyPopper, label: "🎉 Party" },
    { icon: Heart, label: "❤️ Heart" },
  ];

  const quickReactions = [
    { icon: ThumbsUp, label: "👍 Like" },
    { icon: Heart, label: "❤️ Heart" },
    { icon: PartyPopper, label: "🎉 Celebrate" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
        >
          <span role="img" aria-label="reactions">😊</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2">
        <DropdownMenuLabel>Send with effect</DropdownMenuLabel>
        <div className="grid grid-cols-5 gap-1 p-1">
          {effectReactions.map((reaction) => (
            <Button
              key={reaction.label}
              variant="ghost"
              className="flex flex-col items-center p-2 h-auto hover:bg-accent"
              onClick={() => sendReaction(reaction.label)}
            >
              <reaction.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Reactions</DropdownMenuLabel>
        <div className="grid grid-cols-5 gap-1 p-1">
          {quickReactions.map((reaction) => (
            <Button
              key={reaction.label}
              variant="ghost"
              className="flex flex-col items-center p-2 h-auto hover:bg-accent"
              onClick={() => sendReaction(reaction.label)}
            >
              <reaction.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        <Button
          variant="secondary"
          className="w-full mt-1 gap-2"
          onClick={() => sendReaction("✋ Raised Hand")}
        >
          <Hand className="h-4 w-4" />
          <span>Raise hand</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Reactions;

