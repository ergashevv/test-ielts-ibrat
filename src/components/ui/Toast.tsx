"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type ToastVariant = "error" | "success" | "info";

interface ToastItem {
    id: number;
    variant: ToastVariant;
    title?: string;
    message: string;
    duration: number;
}

interface ToastApi {
    show: (args: { variant?: ToastVariant; title?: string; message: string; duration?: number }) => void;
    error: (message: string, title?: string) => void;
    success: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastApi | undefined>(undefined);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const dismiss = useCallback((id: number) => {
        setToasts((current) => current.filter((t) => t.id !== id));
    }, []);

    const show = useCallback<ToastApi["show"]>(
        ({ variant = "info", title, message, duration = 5000 }) => {
            const id = nextId++;
            setToasts((current) => [...current, { id, variant, title, message, duration }]);
        },
        [],
    );

    const api = useMemo<ToastApi>(
        () => ({
            show,
            error: (message, title) => show({ variant: "error", message, title }),
            success: (message, title) => show({ variant: "success", message, title }),
            info: (message, title) => show({ variant: "info", message, title }),
        }),
        [show],
    );

    return (
        <ToastContext.Provider value={api}>
            {children}
            <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[360px] max-w-[calc(100vw-32px)] flex-col gap-2">
                {toasts.map((t) => (
                    <ToastCard key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
    useEffect(() => {
        if (!item.duration) return;
        const t = setTimeout(onDismiss, item.duration);
        return () => clearTimeout(t);
    }, [item.duration, onDismiss]);

    const styles = STYLES[item.variant];

    return (
        <div
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-[12px] border px-4 py-3 shadow-[0px_8px_24px_rgba(15,23,42,0.12)] animate-slide-up ${styles.container}`}
        >
            <span className="mt-0.5 shrink-0">{styles.icon}</span>
            <div className="flex-1 min-w-0">
                {item.title && (
                    <p className={`text-[14px] font-semibold leading-5 ${styles.title}`}>
                        {item.title}
                    </p>
                )}
                <p className={`text-[14px] leading-5 ${styles.message} ${item.title ? "mt-0.5" : ""}`}>
                    {item.message}
                </p>
            </div>
            <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss"
                className={`shrink-0 rounded-md p-1 transition hover:bg-black/5 ${styles.close}`}
            >
                <X size={16} strokeWidth={2.5} />
            </button>
        </div>
    );
}

const STYLES: Record<
    ToastVariant,
    { container: string; title: string; message: string; close: string; icon: ReactNode }
> = {
    error: {
        container: "border-[#FCA5A5] bg-[#FEF2F2]",
        title: "text-[#7F1D1D]",
        message: "text-[#991B1B]",
        close: "text-[#991B1B]",
        icon: <AlertCircle size={18} className="text-[#DC2626]" strokeWidth={2.5} />,
    },
    success: {
        container: "border-[#86EFAC] bg-[#F0FDF4]",
        title: "text-[#14532D]",
        message: "text-[#166534]",
        close: "text-[#166534]",
        icon: <CheckCircle2 size={18} className="text-[#16A34A]" strokeWidth={2.5} />,
    },
    info: {
        container: "border-[#BFDBFE] bg-[#EFF6FF]",
        title: "text-[#1E3A8A]",
        message: "text-[#1E40AF]",
        close: "text-[#1E40AF]",
        icon: <Info size={18} className="text-[#2563EB]" strokeWidth={2.5} />,
    },
};

export function useToast(): ToastApi {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return ctx;
}
