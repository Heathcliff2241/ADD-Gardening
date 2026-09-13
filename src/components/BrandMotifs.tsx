import React from "react";

export const RobinIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Stylized English Robin on a twig */}
    {/* Branch */}
    <path d="M4 27C10 26 18 26 28 28" stroke="#123424" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 26.5L10 30" stroke="#123424" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 26.5L21 30" stroke="#123424" strokeWidth="2" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="16" cy="17" rx="8" ry="7" fill="#4B382A" />
    {/* Iconic red/orange breast */}
    <path d="M11 15C11 11 14 9 18 9C21 9 23 11 23 15C23 19 20 22 16 22C13 22 11 19 11 15Z" fill="#D9531E" />
    {/* Head */}
    <circle cx="20" cy="11" r="5" fill="#5C4033" />
    <circle cx="21.5" cy="10" r="1" fill="#123424" />
    {/* Beak */}
    <polygon points="25,11 28,12 25,13" fill="#C9A227" />
    {/* Wing */}
    <path d="M9 16C8 19 10 23 15 23C13 21 11 19 11 16Z" fill="#3D2B1F" />
    {/* Tail feathers */}
    <path d="M8 20L4 23L7 22" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ButterflyIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Butterfly wings in gold and forest green */}
    <path d="M15 16C12 9 4 8 5 15C5.8 20 13 18 15 16Z" fill="#C9A227" fillOpacity="0.85" stroke="#1F4B34" strokeWidth="1.2" />
    <path d="M17 16C20 9 28 8 27 15C26.2 20 19 18 17 16Z" fill="#C9A227" fillOpacity="0.85" stroke="#1F4B34" strokeWidth="1.2" />
    <path d="M15 17C12 20 7 24 9 27C12 28 15 22 15 17Z" fill="#1F4B34" fillOpacity="0.8" stroke="#1F4B34" strokeWidth="1.2" />
    <path d="M17 17C20 20 25 24 23 27C20 28 17 22 17 17Z" fill="#1F4B34" fillOpacity="0.8" stroke="#1F4B34" strokeWidth="1.2" />
    {/* Body & Antennae */}
    <ellipse cx="16" cy="18" rx="1.2" ry="7" fill="#123424" />
    <path d="M15.5 11C14 8 12 7 10 7" stroke="#123424" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16.5 11C18 8 20 7 22 7" stroke="#123424" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
