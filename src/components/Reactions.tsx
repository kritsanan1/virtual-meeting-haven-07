
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, ThumbsUp, PartyPopper, Smile, Hand } from 'lucide-react';

const Reactions = () => {
  const { toast } = useToast();

  const sendReaction = (reaction: string) => {
    toast({
      title: "Reaction Sent",
      description: `You reacted with ${reaction}`,
      duration: 1500,
    });
  };

  const reactions = [
    { icon: ThumbsUp, label: "👍 Like" },
    { icon: Heart, label: "❤️ Heart" },
    { icon: Smile, label: "😂 Laugh" },
    { icon: PartyPopper, label: "🎉 Celebrate" },
    { icon: Hand, label: "✋ Raise Hand" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
          <span className="sr-only">Reactions</span>
          😊
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 grid grid-cols-3 gap-2 p-2">
        {reactions.map((reaction) => (
          <Button
            key={reaction.label}
            variant="ghost"
            className="flex flex-col items-center p-2 h-auto hover:bg-accent"
            onClick={() => sendReaction(reaction.label)}
          >
            <reaction.icon className="h-6 w-6 mb-1" />
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Reactions;
