import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  hideSidebar?: boolean;
}

export function Layout({
  children,
  fullWidth = false,
  hideSidebar = false,
}: LayoutProps): JSX.Element {
  return (
    <div
      className={`min-h-screen bg-background ${
        fullWidth ? "w-full" : "container mx-auto px-4"
      }`}
    >
      {children}
    </div>
  );
}
