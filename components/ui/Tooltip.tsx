import React from "react";

interface Props {
  text: string;
  children: React.ReactNode
}

export default function Tooltip({ text, children }: Props) {
  return (
    <div className="relative group  w-full">
      {children}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                       opacity-0 group-hover:opacity-100 group-focus:opacity-100  group-active:opacity-100 
                       transition bg-gray-800 text-white text-xs 
                       rounded px-2 py-1 whitespace-nowrap pointer-events-none">
        {text}
      </span>
    </div>
  );
}