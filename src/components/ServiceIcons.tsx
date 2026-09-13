import React from "react";

interface ServiceIconProps {
  type: "mower" | "shears" | "tidy" | "flower" | "fence" | "pressure" | "pond" | "flatpack";
  className?: string;
  size?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ type, className = "", size = 64 }) => {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 border-[#C9A227]/30 bg-[#FFFDF7] text-[#1F4B34] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {type === "mower" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Lawn mower with wheels & grass blade stripes */}
          <circle cx="6" cy="18" r="3" fill="#C9A227" fillOpacity="0.25" />
          <circle cx="18" cy="18" r="3" fill="#C9A227" fillOpacity="0.25" />
          <path d="M6 15h12l1-6H9l-2 3" />
          <path d="M12 9V4l3-1" />
          <line x1="2" y1="21" x2="22" y2="21" strokeDasharray="2 2" stroke="#1F4B34" />
        </svg>
      )}

      {type === "shears" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Hedge shears / pruning loppers */}
          <circle cx="6" cy="6" r="3" fill="#C9A227" fillOpacity="0.25" />
          <circle cx="6" cy="18" r="3" fill="#C9A227" fillOpacity="0.25" />
          <path d="M8.5 8.5L20 18" />
          <path d="M8.5 15.5L20 6" />
          <circle cx="12" cy="12" r="1.5" fill="#1F4B34" />
        </svg>
      )}

      {type === "tidy" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Oak leaf / rake garden maintenance */}
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="#C9A227" fillOpacity="0.2" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      )}

      {type === "flower" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Garden flower with central bud & petals */}
          <circle cx="12" cy="12" r="3.5" fill="#C9A227" />
          <path d="M12 2a3 3 0 0 0-3 3c0 2 3 4 3 4s3-2 3-4a3 3 0 0 0-3-3z" fill="#1F4B34" fillOpacity="0.3" />
          <path d="M12 22a3 3 0 0 0 3-3c0-2-3-4-3-4s-3 2-3 4a3 3 0 0 0 3 3z" fill="#1F4B34" fillOpacity="0.3" />
          <path d="M2 12a3 3 0 0 0 3 3c2 0 4-3 4-3s-2-3-4-3a3 3 0 0 0-3 3z" fill="#1F4B34" fillOpacity="0.3" />
          <path d="M22 12a3 3 0 0 0-3-3c-2 0-4 3-4 3s2 3 4 3a3 3 0 0 0 3-3z" fill="#1F4B34" fillOpacity="0.3" />
        </svg>
      )}

      {type === "fence" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Wooden fence with paint brush */}
          <rect x="4" y="6" width="3" height="14" rx="1" fill="#C9A227" fillOpacity="0.2" />
          <rect x="10.5" y="4" width="3" height="16" rx="1" fill="#C9A227" fillOpacity="0.2" />
          <rect x="17" y="6" width="3" height="14" rx="1" fill="#C9A227" fillOpacity="0.2" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <line x1="2" y1="15" x2="22" y2="15" />
        </svg>
      )}

      {type === "pressure" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Pressure washer nozzle & water droplets */}
          <path d="M3 15h6l4-7h5" />
          <path d="M18 6l3 2-3 2" />
          <circle cx="21" cy="8" r="1" fill="#1F4B34" />
          <path d="M12 15l2 3h4" />
          <circle cx="19" cy="14" r="1.5" fill="#C9A227" />
          <circle cx="21" cy="18" r="1" fill="#C9A227" />
        </svg>
      )}

      {type === "pond" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Swimming fish / koi pond ripples */}
          <path d="M18 10c0-3.5-3-5-7-5s-8 4-8 7c0 3 4 5 7 5 5 0 8-3.5 8-7z" fill="#C9A227" fillOpacity="0.2" />
          <path d="M18 10l4-3v6l-4-3z" fill="#C9A227" />
          <circle cx="6" cy="11" r="1" fill="#1F4B34" />
          <path d="M10 13c1 1 2 1 3 0" />
        </svg>
      )}

      {type === "flatpack" && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Assembly tool / screwdriver / furniture box */}
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="#C9A227" fillOpacity="0.15" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )}
    </div>
  );
};
