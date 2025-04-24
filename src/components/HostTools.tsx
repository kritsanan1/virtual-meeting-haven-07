
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface HostToolsProps {
  isHost: boolean;
}

const HostTools: React.FC<HostToolsProps> = ({ isHost }) => {
  const { toast } = useToast();

  const handlePermissionChange = (setting: string) => {
    toast({
      title: "Permission Updated",
      description: `${setting} setting has been updated`,
    });
  };

  if (!isHost) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white hover:bg-gray-100">
          <Shield className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Meeting Controls</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handlePermissionChange("Lock meeting")}>
            Lock meeting
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Enable waiting room")}>
            Enable waiting room
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Hide profile pictures")}>
            Hide profile pictures
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Allow all participants to:</DropdownMenuLabel>
        <DropdownMenuGroup className="p-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="share-screen" onCheckedChange={() => handlePermissionChange("Share screen")} />
            <label htmlFor="share-screen">Share screen</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="chat" defaultChecked onCheckedChange={() => handlePermissionChange("Chat")} />
            <label htmlFor="chat">Chat</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rename" defaultChecked onCheckedChange={() => handlePermissionChange("Rename themselves")} />
            <label htmlFor="rename">Rename themselves</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="unmute" defaultChecked onCheckedChange={() => handlePermissionChange("Unmute themselves")} />
            <label htmlFor="unmute">Unmute themselves</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="start-video" defaultChecked onCheckedChange={() => handlePermissionChange("Start video")} />
            <label htmlFor="start-video">Start video</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="share-docs" defaultChecked onCheckedChange={() => handlePermissionChange("Share documents")} />
            <label htmlFor="share-docs">Share documents</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="share-whiteboard" defaultChecked onCheckedChange={() => handlePermissionChange("Share whiteboards")} />
            <label htmlFor="share-whiteboard">Share whiteboards</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="share-notes" defaultChecked onCheckedChange={() => handlePermissionChange("Share notes")} />
            <label htmlFor="share-notes">Share notes</label>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Recording Options</DropdownMenuLabel>
        <DropdownMenuGroup className="p-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="record" onCheckedChange={() => handlePermissionChange("Record to computer")} />
            <label htmlFor="record">Record to computer</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="request-record" defaultChecked onCheckedChange={() => handlePermissionChange("Request to record")} />
            <label htmlFor="request-record">Request to record to computer</label>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handlePermissionChange("Collaborate with Apps")}>
            Collaborate with Apps
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Set meeting timers")}>
            Set meeting timers
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500" 
          onClick={() => handlePermissionChange("Suspend participant activities")}
        >
          Suspend participant activities
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HostTools;

