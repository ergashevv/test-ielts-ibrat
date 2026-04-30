"use client";

import React from "react";

interface ErrorBoundaryState {
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: (error: Error, reset: () => void) => React.ReactNode;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, info);
    }

    reset = () => {
        this.setState({ error: null });
    };

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        if (this.props.fallback) {
            return this.props.fallback(error, this.reset);
        }

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
                <div className="w-full max-w-[420px] rounded-[16px] border border-white bg-white p-6 shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)]">
                    <h2 className="text-[20px] font-bold leading-7 text-[#0F172A]">
                        Something went wrong
                    </h2>
                    <p className="mt-2 text-[14px] leading-5 text-[#475569]">
                        {error.message || "An unexpected error occurred."}
                    </p>
                    <button
                        type="button"
                        onClick={this.reset}
                        className="mt-4 inline-flex h-10 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#779DFF] to-[#2D68FF] px-5 text-[15px] font-semibold text-white"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }
}
