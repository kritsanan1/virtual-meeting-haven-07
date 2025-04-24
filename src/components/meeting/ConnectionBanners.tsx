interface ConnectionBannersProps {
  onActivateFreeTrial: () => void;
  className?: string;
}
export function ConnectionBanners({
  onActivateFreeTrial,
  className
}: ConnectionBannersProps) {
  return <div className="space-y-4">
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 text-meeting-primary">
          <span className="text-sm font-medium">
            Connect your calendar to manage all your events in one place and experience all advanced features!{" "}
            <a href="#" className={`underline hover:bg-meeting-primary hover:text-white transition-colors ${className}`}>
              Connect
            </a>
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3">
          <button className={`bg-meeting-primary hover:bg-meeting-primary/90 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${className}`} onClick={onActivateFreeTrial}>
            FREE TRIAL
          </button>
          <span className="text-meeting-primary font-medium text-base">
            Set up a Zoom Scheduler booking page for others to easily book with you—free for 14 days!{" "}
            <button className={`text-meeting-primary underline hover:bg-meeting-primary hover:text-white transition-colors ${className}`} onClick={onActivateFreeTrial}>
              Try Now
            </button>
          </span>
        </div>
      </div>
    </div>;
}