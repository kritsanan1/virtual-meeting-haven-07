
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PreviewOptions = () => {
  const { toast } = useToast();
  const [selectedView, setSelectedView] = useState('Speaker');

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    toast({
      title: "View Changed",
      description: `Changed to ${view} view`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-white hover:bg-gray-100"
        >
          <Eye className="h-5 w-5 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1c1c1c] border-gray-700">
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => handleViewChange('Speaker')}
        >
          <span className="flex items-center">
            {selectedView === 'Speaker' && '✓ '}Speaker
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => handleViewChange('Gallery')}
        >
          <span className="flex items-center">
            {selectedView === 'Gallery' && '✓ '}Gallery
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => handleViewChange('Multi-speaker')}
        >
          <span className="flex items-center">
            {selectedView === 'Multi-speaker' && '✓ '}Multi-speaker
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => handleViewChange('Immersive')}
        >
          <span className="flex items-center">
            {selectedView === 'Immersive' && '✓ '}Immersive
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => toast({
            title: "Order Updated",
            description: "Following host's video order"
          })}
        >
          Follow host's video order
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => toast({
            title: "Theme Changed",
            description: "Theme settings updated"
          })}
        >
          Change theme
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => toast({
            title: "View Updated",
            description: "Self view hidden"
          })}
        >
          Hide self view
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => toast({
            title: "View Updated",
            description: "Non-video participants hidden"
          })}
        >
          Hide non-video participants
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => toast({
            title: "Timers Enabled",
            description: "Meeting timers are now visible"
          })}
        >
          Show meeting timers
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-gray-300 focus:bg-gray-800 focus:text-gray-300 cursor-pointer"
          onClick={() => {
            document.documentElement.requestFullscreen();
            toast({
              title: "Display Changed",
              description: "Entered fullscreen mode"
            });
          }}
        >
          Fullscreen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PreviewOptions;
