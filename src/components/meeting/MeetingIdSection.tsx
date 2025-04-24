
import { FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { MeetingFormData } from "./types";

interface MeetingIdSectionProps {
  form: UseFormReturn<MeetingFormData>;
}

export function MeetingIdSection({ form }: MeetingIdSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Meeting ID</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="meetingId"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="automatic"
                  checked={field.value === "automatic"}
                  onChange={() => field.onChange("automatic")}
                  className="rounded-full"
                />
                <label htmlFor="automatic">Generate Automatically</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="personal"
                  checked={field.value === "personal"}
                  onChange={() => field.onChange("personal")}
                  className="rounded-full"
                />
                <label htmlFor="personal">Personal Meeting ID 694 209 6101</label>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
