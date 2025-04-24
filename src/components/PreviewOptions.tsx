
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const PreviewOptions = () => {
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
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          <span className="flex items-center">✓ Speaker</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Gallery
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Multi-speaker
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Immersive
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Follow host's video order
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Change theme
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Hide self view
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Hide non-video participants
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Show meeting timers
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-gray-300">
          Fullscreen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PreviewOptions;
