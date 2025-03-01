import React from 'react';

export function ImageToolsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 3h6v6" />
      <path d="M10 21H3v-6" />
      <path d="m21 3-9 9" />
      <path d="m3 21 9-9" />
      <circle cx="14" cy="14" r="3" />
    </svg>
  );
}
