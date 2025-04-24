
interface ConnectionBannersProps {
  onActivateFreeTrial: () => void;
  className?: string; // Add optional className prop
}

export function ConnectionBanners({ 
  onActivateFreeTrial, 
  className 
}: ConnectionBannersProps) {
  return (
    <div className="mb-8">
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-blue-600">
          <span className="text-sm">
            Connect your calendar to manage all your events in one place and experience all advanced features!{" "}
            <a 
              href="#" 
              className={`underline hover:text-white ${className}`}
            >
              Connect
            </a>
          </span>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <button 
            className={`bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded h-auto hover:text-white ${className}`}
            onClick={onActivateFreeTrial}
          >
            FREE TRIAL
          </button>
          <span className="text-sm">
            Set up a Zoom Scheduler booking page for others to easily book with you—free for 14 days!{" "}
            <button 
              className={`text-blue-600 underline hover:text-white ${className}`} 
              onClick={onActivateFreeTrial}
            >
              Try Now
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
