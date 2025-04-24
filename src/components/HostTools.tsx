
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
        <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
          <span className="sr-only">Host tools</span>
          🛡️
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Meeting Controls</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handlePermissionChange("Lock meeting")}>
            Lock meeting
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Waiting room")}>
            Enable waiting room
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Profile pictures")}>
            Hide profile pictures
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Participant Permissions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handlePermissionChange("Screen sharing")}>
            Share screen
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Chat")}>
            Chat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Rename")}>
            Rename themselves
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePermissionChange("Video")}>
            Start video
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HostTools;
