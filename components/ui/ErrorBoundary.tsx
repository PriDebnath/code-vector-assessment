"use client";

import { Component, ReactNode } from "react";

export default class ErrorBoundary extends Component<
  { 
    children: ReactNode 
    errorMessage?: string;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
           <div className="rounded-2xl bg-neutral-900 p-4 text-red-500">
          {this.props.errorMessage ?? "Something went wrong. Contact the developer."}
        </div>
        )
    }

    return this.props.children;
  }
}