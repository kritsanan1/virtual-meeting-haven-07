
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TrialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: () => void;
}

export function TrialDialog({ open, onOpenChange, onActivate }: TrialDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Activate Your Free Trial</DialogTitle>
          <DialogDescription>
            Enjoy all premium features of Zoom Scheduler for 14 days at no cost.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p>Your free trial includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Custom booking pages</li>
            <li>Advanced scheduling options</li>
            <li>Calendar integration</li>
            <li>Automated reminders</li>
          </ul>
          <p className="text-sm text-gray-500">No credit card required. Cancel anytime.</p>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onActivate}
            className="bg-meeting-primary hover:bg-meeting-primary/90 text-white"
          >
            Start Free Trial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
