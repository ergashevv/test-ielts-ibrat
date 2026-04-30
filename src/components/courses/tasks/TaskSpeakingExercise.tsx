"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, Mic, Play, RotateCcw, Volume2 } from "lucide-react";
import { CourseTheme } from "@/types";
import { TaskHeader } from "../shared";
import { useAnalyzeSpeech } from "@/hooks/queries";
import type { SpeechAnalysisResult } from "@/services/answers.service";

type Phase = "idle" | "recording" | "playback" | "result";

interface TaskSpeakingExerciseProps {
    onFinish?: () => void;
    onBack?: () => void;
    onClose?: () => void;
    title?: string;
    question?: string;
    questionLabel?: string;
    helperLabel?: string;
    helperText?: string;
    helperFirst?: boolean;
    transcript?: string;
    feedbackTitle?: string;
    feedbackSubtitle?: string;
    modelAnswer?: string;
    audioClue?: string;
    audioWaveform?: boolean;
    hideQuestionCard?: boolean;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
    // API integration: when all four are provided, "Check" uploads the recording
    // to /analyze-speech and renders the returned transcript + feedback.
    practicumId?: string;
    moduleId?: string;
    lessonId?: string;
    questionId?: string;
    language?: string;
}

const DEFAULT_THEME: CourseTheme = {
    primaryColor: "#54B741",
    gradient: "linear-gradient(180deg, #71CC5E 0%, #54B741 100%)",
    shadowColor: "rgba(84, 183, 65, 0.4)",
    lightBg: "#F0F9F0",
    bgGradient: "from-[#F0F9F0] via-white to-white"
};

const RECORDING_LIMIT = 60;

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function Waveform({ color, animated }: { color: string; animated: boolean }) {
    const bars = React.useMemo(
        () => Array.from({ length: 48 }, (_, i) => 30 + Math.abs(Math.sin(i * 0.7)) * 70),
        []
    );
    return (
        <div className="flex items-center gap-[3px] h-9">
            {bars.map((h, i) => (
                <span
                    key={i}
                    className={`w-[3px] rounded-full ${animated ? "animate-pulse" : ""}`}
                    style={{
                        height: `${h}%`,
                        backgroundColor: color,
                        opacity: 0.6 + (i % 3) * 0.13,
                        animationDelay: animated ? `${i * 30}ms` : undefined
                    }}
                />
            ))}
        </div>
    );
}

export function TaskSpeakingExercise({
    onFinish = () => { },
    onBack = () => { },
    onClose,
    title = "Answer the question",
    question = "How often do you watch TV or movies in the evening?",
    questionLabel = "Question:",
    helperLabel = "Use one of these words:",
    helperText = "always, usually, often, sometimes, occasionally, hardly ever, never.",
    helperFirst = false,
    transcript = "In the evening, I usually watch TV or movies to relax. I often watch something after dinner, especially on weekdays. Sometimes I watch a movie, but occasionally I prefer reading or listening to music instead. I hardly ever watch TV very late at night, and I never watch it when I have a lot of work to do. On weekends, I always try to enjoy at least one good movie.",
    feedbackTitle = "Good Job",
    feedbackSubtitle = "You used frequency adverbs and new vocabulary",
    modelAnswer,
    audioClue,
    audioWaveform = false,
    hideQuestionCard = false,
    courseTheme = DEFAULT_THEME,
    progress,
    segments,
    practicumId,
    moduleId,
    lessonId,
    questionId,
    language = "english",
}: TaskSpeakingExerciseProps) {
    const [phase, setPhase] = useState<Phase>("idle");
    const [recordingTime, setRecordingTime] = useState(0);
    const [showTranscript, setShowTranscript] = useState(false);
    const [showModelAnswer, setShowModelAnswer] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingError, setRecordingError] = useState<string | null>(null);
    const [apiResult, setApiResult] = useState<SpeechAnalysisResult | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioElRef = useRef<HTMLAudioElement | null>(null);
    const showQuestionCard = !hideQuestionCard && !audioClue && !audioWaveform;

    const analyzeSpeech = useAnalyzeSpeech();

    const canCallApi = useMemo(
        () => Boolean(practicumId && moduleId && lessonId && questionId),
        [practicumId, moduleId, lessonId, questionId],
    );

    useEffect(() => {
        if (phase === "recording") {
            intervalRef.current = setInterval(() => {
                setRecordingTime((t) => {
                    if (t + 1 >= RECORDING_LIMIT) {
                        stopRecorder();
                        setPhase("playback");
                        return RECORDING_LIMIT;
                    }
                    return t + 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [phase]);

    useEffect(() => {
        return () => {
            if (audioUrl) URL.revokeObjectURL(audioUrl);
            stopRecorder();
        };
    }, [audioUrl]);

    const stopRecorder = () => {
        const mr = recorderRef.current;
        if (mr && mr.state === "recording") {
            mr.stop();
        }
        recorderRef.current = null;
    };

    const handleStartRecording = async () => {
        setRecordingError(null);
        setAudioBlob(null);
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            setAudioUrl(null);
        }
        setApiResult(null);

        if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
            // No mic API (SSR / unsupported browser) — fall back to mock recording.
            setRecordingTime(0);
            setPhase("recording");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            chunksRef.current = [];
            const mr = new MediaRecorder(stream);
            mr.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
            };
            mr.onstop = () => {
                const mimeType = mr.mimeType || "audio/webm";
                const blob = new Blob(chunksRef.current, { type: mimeType });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                stream.getTracks().forEach((t) => t.stop());
            };
            recorderRef.current = mr;
            mr.start();
            setRecordingTime(0);
            setPhase("recording");
        } catch {
            setRecordingError(
                "Microphone access denied. Please allow access and try again.",
            );
        }
    };

    const handleStopRecording = () => {
        stopRecorder();
        setPhase("playback");
    };

    const handleRetalk = () => {
        setShowTranscript(false);
        setRecordingTime(0);
        setAudioBlob(null);
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            setAudioUrl(null);
        }
        setApiResult(null);
        setRecordingError(null);
        setPhase("idle");
    };

    const handleCheck = async () => {
        if (canCallApi && audioBlob && practicumId && moduleId && lessonId && questionId) {
            try {
                const result = await analyzeSpeech.mutateAsync({
                    practicumId,
                    moduleId,
                    lessonId,
                    questionId,
                    file: audioBlob,
                    language,
                });
                setApiResult(result);
            } catch {
                // Fall back to static feedback when the API call fails.
            }
        }
        setPhase("result");
    };

    const handleContinue = () => {
        onFinish();
    };

    const handlePlayback = () => {
        const el = audioElRef.current;
        if (!el) return;
        if (el.paused) {
            void el.play();
        } else {
            el.pause();
        }
    };

    const displayedTranscript = apiResult?.transcript || transcript;
    const displayedFeedbackTitle = apiResult?.score !== undefined
        ? `Score: ${apiResult.score}`
        : feedbackTitle;
    const displayedFeedbackSubtitle = apiResult?.feedback || feedbackSubtitle;
    const checking = analyzeSpeech.isPending;

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onClose || onBack}
                progress={progress}
                segments={segments}
                courseTheme={courseTheme}
            />

            {audioUrl && (
                <audio ref={audioElRef} src={audioUrl} preload="auto" className="hidden" />
            )}

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 pb-40">
                <div className="w-full max-w-[600px] flex flex-col gap-6 animate-scale-in">
                    <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight text-center">
                        {title}
                    </h2>

                    {helperFirst && (helperLabel || helperText) && (
                        <div className="rounded-[16px] p-5 border bg-[#F8FAFC] border-[#E2E8F0]">
                            {helperLabel && (
                                <span className="text-[#64748B] text-[14px] font-semibold mb-1.5 block">{helperLabel}</span>
                            )}
                            {helperText && (
                                <p className="text-[16px] font-medium leading-relaxed text-[#475569]">
                                    {helperText}
                                </p>
                            )}
                        </div>
                    )}

                    {showQuestionCard && (
                        <div className="rounded-[16px] p-5 border bg-[#EFF6FF] border-[#BFDBFE]">
                            <span className="text-[#2563EB] text-[15px] font-semibold mb-1.5 block">{questionLabel}</span>
                            <p className="text-[17px] font-medium leading-relaxed text-[#0F172A]">
                                {question}
                            </p>
                        </div>
                    )}

                    {audioClue && (
                        <div className="rounded-[16px] py-4 px-5 border bg-[#EFF6FF] border-[#BFDBFE] flex items-center gap-3">
                            <Volume2 size={20} className="text-[#2563EB] shrink-0" strokeWidth={2.5} />
                            <p className="text-[16px] font-medium leading-relaxed text-[#0F172A]">
                                {audioClue}
                            </p>
                        </div>
                    )}

                    {audioWaveform && (
                        <div className="rounded-[16px] py-4 px-5 border bg-[#EFF6FF] border-[#BFDBFE] flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Play clue audio"
                                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-[#2563EB1A]"
                            >
                                <Play size={16} className="text-[#2563EB]" fill="#2563EB" />
                            </button>
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                <Waveform color="#2563EB" animated={false} />
                                <span className="text-[12px] font-medium text-[#64748B] tabular-nums">
                                    00:30 / 01:00
                                </span>
                            </div>
                        </div>
                    )}

                    {!helperFirst && (helperLabel || helperText) && (
                        <div className="rounded-[16px] p-5 border bg-[#F8FAFC] border-[#E2E8F0]">
                            {helperLabel && (
                                <span className="text-[#64748B] text-[14px] font-semibold mb-1.5 block">{helperLabel}</span>
                            )}
                            {helperText && (
                                <p className="text-[16px] font-medium leading-relaxed text-[#475569]">
                                    {helperText}
                                </p>
                            )}
                        </div>
                    )}

                    {modelAnswer && phase === "idle" && (
                        showModelAnswer ? (
                            <div className="bg-white rounded-[16px] p-5 border border-[#E2E8F0] flex flex-col gap-4 shadow-sm">
                                <p className="text-[15px] italic leading-relaxed text-[#475569]">
                                    {modelAnswer}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowModelAnswer(false)}
                                    className="flex items-center justify-center gap-2 text-[15px] font-semibold text-[#0F172A] hover:opacity-80 transition-opacity"
                                >
                                    <EyeOff size={16} strokeWidth={2.5} />
                                    Hide model answer
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowModelAnswer(true)}
                                className="bg-white rounded-[16px] py-4 border border-[#E2E8F0] flex items-center justify-center gap-2.5 hover:border-[#CBD5E1] transition-colors shadow-sm"
                            >
                                <Eye size={16} className="text-[#0F172A]" strokeWidth={2.5} />
                                <span className="text-[15px] font-semibold text-[#0F172A]">
                                    Show model answer
                                </span>
                            </button>
                        )
                    )}

                    {recordingError && (
                        <p className="text-[14px] font-medium leading-5 text-[#DC2626] text-center">
                            {recordingError}
                        </p>
                    )}

                    {phase === "idle" && (
                        <button
                            type="button"
                            onClick={handleStartRecording}
                            className="bg-white rounded-[16px] py-5 border border-[#E2E8F0] flex items-center justify-center gap-2.5 hover:border-[#CBD5E1] transition-colors shadow-sm"
                        >
                            <Mic size={18} style={{ color: courseTheme.primaryColor }} strokeWidth={2.5} />
                            <span className="text-[16px] font-semibold" style={{ color: courseTheme.primaryColor }}>
                                Tap to talk
                            </span>
                        </button>
                    )}

                    {phase === "recording" && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-white rounded-[16px] py-5 px-6 border border-[#E2E8F0] flex items-center gap-4 w-full shadow-sm">
                                <span className="text-[14px] font-semibold text-[#64748B] tabular-nums shrink-0">
                                    {formatTime(recordingTime)}
                                </span>
                                <div className="flex-1">
                                    <Waveform color={courseTheme.primaryColor} animated />
                                </div>
                                <span className="text-[14px] font-semibold text-[#64748B] tabular-nums shrink-0">
                                    {formatTime(RECORDING_LIMIT)}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleStopRecording}
                                className="flex items-center gap-2.5 text-[16px] font-semibold text-[#0F172A] hover:opacity-80 transition-opacity"
                            >
                                <span className="w-4 h-4 rounded-[3px] bg-[#FF2C2C]" />
                                Stop talking
                            </button>
                        </div>
                    )}

                    {phase === "playback" && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="bg-white rounded-[16px] py-4 px-5 border border-[#E2E8F0] w-full shadow-sm flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handlePlayback}
                                        aria-label="Play recording"
                                        disabled={!audioUrl}
                                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50"
                                        style={{ backgroundColor: `${courseTheme.primaryColor}1A` }}
                                    >
                                        <Play size={16} style={{ color: courseTheme.primaryColor }} fill={courseTheme.primaryColor} />
                                    </button>
                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                        <Waveform color={courseTheme.primaryColor} animated={false} />
                                        <span className="text-[12px] font-medium text-[#94A3B8] tabular-nums">
                                            {formatTime(recordingTime)} / {formatTime(RECORDING_LIMIT)}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowTranscript((v) => !v)}
                                        aria-label="Toggle transcript"
                                        className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 hover:bg-slate-50 transition-colors"
                                        style={{ borderColor: `${courseTheme.primaryColor}55` }}
                                    >
                                        <span className="text-[11px] font-bold" style={{ color: courseTheme.primaryColor }}>
                                            →A
                                        </span>
                                    </button>
                                </div>
                                {showTranscript && (
                                    <p className="text-[14px] leading-relaxed text-[#475569] pt-2 border-t border-slate-100">
                                        {displayedTranscript}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleRetalk}
                                className="flex items-center gap-2 text-[15px] font-semibold text-[#0F172A] hover:opacity-80 transition-opacity"
                            >
                                <RotateCcw size={16} strokeWidth={2.5} />
                                Tap to retalk
                            </button>
                        </div>
                    )}

                    {phase === "result" && (
                        <div className="bg-white rounded-[16px] py-4 px-5 border border-[#E2E8F0] w-full shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handlePlayback}
                                    aria-label="Play recording"
                                    disabled={!audioUrl}
                                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50"
                                    style={{ backgroundColor: `${courseTheme.primaryColor}1A` }}
                                >
                                    <Play size={16} style={{ color: courseTheme.primaryColor }} fill={courseTheme.primaryColor} />
                                </button>
                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                    <Waveform color={courseTheme.primaryColor} animated={false} />
                                    <span className="text-[12px] font-medium text-[#94A3B8] tabular-nums">
                                        {formatTime(recordingTime)} / {formatTime(RECORDING_LIMIT)}
                                    </span>
                                </div>
                            </div>
                            {apiResult?.transcript && (
                                <p className="text-[14px] leading-relaxed text-[#475569] pt-2 border-t border-slate-100">
                                    {apiResult.transcript}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-6 px-6 flex items-center justify-center z-50">
                <div className="w-full flex items-center gap-4 justify-between" style={{ maxWidth: "1200px" }}>
                    {phase === "result" ? (
                        <div className="flex-1 flex items-center gap-3 animate-slide-up">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: courseTheme.primaryColor }}>
                                <Check size={22} className="text-white" strokeWidth={3} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[16px] font-bold leading-tight" style={{ color: courseTheme.primaryColor }}>
                                    {displayedFeedbackTitle}
                                </p>
                                <p className="text-[14px] font-medium mt-0.5 text-[#64748B]">
                                    {displayedFeedbackSubtitle}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center">
                            <button
                                onClick={onBack}
                                className="text-[#0F172A] font-bold text-[16px] px-6 py-3 hover:bg-slate-50 rounded-xl transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    )}

                    <button
                        onClick={phase === "result" ? handleContinue : handleCheck}
                        disabled={(phase !== "playback" && phase !== "result") || checking}
                        className={`
                            h-12 px-8 rounded-2xl font-bold text-[18px] transition-all flex items-center justify-center gap-2 active:scale-95 group whitespace-nowrap
                            ${(phase !== "playback" && phase !== "result") || checking
                                ? "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed shadow-none"
                                : "text-white border-b-[2.5px] border-black/10 hover:brightness-105"
                            }
                        `}
                        style={{
                            background: (phase !== "playback" && phase !== "result") || checking ? "" : courseTheme.gradient,
                            boxShadow: (phase !== "playback" && phase !== "result") || checking ? "none" : `0 8px 20px ${courseTheme.shadowColor}`
                        }}
                    >
                        {checking ? (
                            <div className="size-5 rounded-full border-2 border-[#CBD5E1] border-t-transparent animate-spin" />
                        ) : (
                            <>
                                {phase === "result" ? "Continue" : "Check"}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
