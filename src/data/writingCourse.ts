import { CourseTheme, TaskConfig, PresentationStep, PresentationTabsData, PracticeQuestion, SummaryPoint, QuizQuestion } from "@/types";

export const writingTheme: CourseTheme = {
    primaryColor: "#FF5C35",
    gradient: "linear-gradient(180deg, #FF8D70 0%, #FF5C35 100%)",
    shadowColor: "rgba(255, 92, 53, 0.4)",
    lightBg: "#FFF5F3",
    bgGradient: "from-[#FFF5F3] via-white to-white"
};

export const writingLeadInTasks: TaskConfig[] = [
    // 1. Learning outcomes screen (shown first)
    {
        type: "outcomes",
        componentType: "TaskIntro",
        props: {
            showOutcomes: true,
            title: "Writing learning outcomes",
            outcomesTitle: "Learning outcomes",
            outcomesSubtitle: "By the end of this session, you will be able to ...",
            learningPoints: [
                {
                    icon: "1",
                    iconColor: "#3B82F6",
                    title: "Describing trends clearly",
                    description: "use precise verbs and adverbs to describe increases and decreases"
                },
                {
                    icon: "2",
                    iconColor: "#22C55E",
                    title: "Comparing data",
                    description: "link information from different parts of a chart in one sentence"
                },
                {
                    icon: "3",
                    iconColor: "#F97316",
                    title: "Sounding academic",
                    description: "avoid informal phrases and write in a formal style"
                }
            ],
            buttonLabel: "Start The Session"
        }
    },
    // 2. Lead‑in intro card (big icon + description + "Get Started")
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Lead-in",
            content:
                "Look at two short sentences about a chart. Choose the one that sounds more factual and academic. Don’t worry if you make a mistake.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/lead-in-icon.svg"
        }
    },
    // 3. Lead‑in True/False (writing Task 1 style)
    {
        type: "true-false",
        componentType: "TaskTrueFalse",
        props: {
            task: {
                id: "writing-lead-in-tf",
                title: "Lead-in True/False",
                type: "true-false",
                metadata: {
                    instruction: "Select True/False",
                    questions: [
                        {
                            id: "1",
                            context: "The chart shows changes in car production between 2010 and 2020.",
                            task: "The chart compares car production in a single year.",
                            options: ["True", "False"],
                            answer: "False"
                        },
                        {
                            id: "2",
                            tag: "Previous mistake",
                            context: "The chart shows changes in car production between 2010 and 2020.",
                            task: "The chart compares car production in a single year.",
                            options: ["True", "False"],
                            answer: "False"
                        }
                    ]
                }
            }
        }
    },
    // 4. Recap / lesson completed screen
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: {
                score: 15,
                total: 15,
                time: "3:10",
                accuracy: 98
            }
        }
    }
];

// Writing Presentation: intro stage + tabbed content (Text / Audio / Video / Infographic)
export const writingPresentationTabs: PresentationTabsData = {
    intro: {
        title: "Presentation",
        description: "Look at how to describe trends, compare data, and write in a formal academic tone for IELTS Writing Task 1.",
        icon: "/icons/lesson-steps/presentation-icon.svg"
    },
    contentTitle: "Describing Charts & Comparing Data",
    text: {
        intro: "Read the explanation below carefully.",
        sections: [
            {
                paragraphs: [
                    "In Writing Task 1 you describe what a chart shows. Don't write your opinion — only describe the trends, comparisons, and key facts.",
                    "Three things will improve your score quickly:"
                ]
            },
            {
                heading: "1. Describing trends clearly",
                bullets: [
                    "Increase: rise, climb, grow, surge",
                    "Decrease: fall, drop, decline, plunge",
                    "No change: remain stable, stay constant, level off",
                    "Adverbs: sharply, steadily, gradually, slightly"
                ]
            },
            {
                heading: "2. Comparing data",
                paragraphs: [
                    "Don't describe each line in isolation. Link different parts of the chart in one sentence.",
                    "Use linking phrases: while, whereas, in contrast, similarly.",
                    "Example: \"Sales of cars rose sharply, whereas motorbike sales fell over the same period.\""
                ]
            },
            {
                heading: "3. Sounding academic",
                paragraphs: [
                    "Avoid casual phrases like \"a lot of\", \"got bigger\", or \"super high\".",
                    "Prefer: \"a significant number of\", \"increased\", \"considerably high\"."
                ]
            }
        ]
    },
    audio: {
        coverImage: "/images/reading-presentation/vinyl.png",
        durationLabel: "06:15",
        currentLabel: "00:15"
    },
    video: {
        poster: "/images/reading-presentation/video-thumb.png",
        durationLabel: "06:15",
        currentLabel: "00:15"
    },
    infographic: {
        image: "/images/reading-presentation/infographic.png",
        alt: "Mastering the IELTS Writing Test: A 60-Minute Game Plan"
    }
};

// Stage 3 of Writing Presentation: practice question
export const writingPresentationPractice: PracticeQuestion[] = [
    {
        id: "writing-pres-practice-1",
        taskLabel: "Choose the correct answer",
        question: "Which sentence is the most academic way to describe a chart?",
        type: "multiple-choice",
        options: [
            "Sales went up a lot in 2020.",
            "Sales rose sharply in 2020.",
            "Sales got really big in 2020."
        ],
        answer: "Sales rose sharply in 2020.",
        explanation: "\"Rose sharply\" uses a precise verb + adverb — the formal, academic style expected in Task 1."
    }
];

export const presentationSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Describing trends clearly",
        content: "Use precise verbs to describe how a value changes over time, and adverbs to show the speed or size of the change.\n\nIncrease: rise, climb, grow, surge\nDecrease: fall, drop, decline, plunge\nNo change: remain stable, stay constant, level off\n\nAdverbs: sharply, steadily, gradually, slightly",
        image: "/icons/lesson-steps/presentation-icon.svg"
    },
    {
        id: "2",
        title: "Comparing data",
        content: "Don't describe each line on a chart in isolation. Link information from different parts in one sentence to show relationships.\n\nUse comparatives: higher than, twice as many, half of, the same as.\nUse linking phrases: while, whereas, in contrast, similarly.\n\nExample: \"Sales of cars rose sharply, whereas motorbike sales fell over the same period.\"",
        image: "/icons/lesson-steps/presentation-icon.svg"
    },
    {
        id: "3",
        title: "Sounding academic",
        content: "Avoid casual phrases — IELTS Task 1 expects a formal, neutral tone.\n\nAvoid: \"a lot of\", \"got bigger\", \"super high\"\nUse: \"a significant number of\", \"increased\", \"considerably high\"\n\nKeep your opinion out of Task 1 — describe only what the chart shows.",
        image: "/icons/lesson-steps/presentation-icon.svg"
    }
];

export const quickTipsSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Vocabulary Tip",
        content: "Use words like 'increase', 'decrease', and 'fluctuate'."
    }
];

export const practiceSubTasks: PracticeQuestion[] = [
    {
        id: "1",
        question: "Describe the trend.",
        type: "multiple-choice",
        options: ["Upward", "Downward", "Stable"],
        answer: "Upward"
    }
];

export const exercisesSubTasks: PracticeQuestion[] = [
    {
        id: "1",
        question: "Task 1 requires at least ___ words.",
        type: "fill-blank",
        answer: "150"
    }
];

export const improvementSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Peer Review",
        content: "Ask someone to read your writing and provide feedback."
    }
];

export const improvementQuizTask: unknown = {
    questions: [
        {
            id: "1",
            question: "Is 150 words enough?",
            options: ["Yes", "No"],
            answer: "Yes"
        }
    ]
};

export const summarySubTasks: SummaryPoint[] = [
    {
        id: "1",
        title: "Key Takeaway #1: Plan before you write",
        description: "Spend 2–3 minutes planning. Identify the main trend, two key features, and a comparison before drafting."
    },
    {
        id: "2",
        title: "Key Takeaway #2: Use precise verbs",
        description: "Replace 'go up' with 'rise', 'increase', 'climb', 'surge'. Variety lifts your Lexical Resource score."
    },
    {
        id: "3",
        title: "Key Takeaway #3: Compare data",
        description: "Use linking phrases like 'whereas', 'while', 'compared to' to show relationships, not just isolated numbers."
    },
    {
        id: "4",
        title: "Key Takeaway #4: 150 words minimum",
        description: "Task 1 must be at least 150 words. Aim for 160–180 to be safe — going under loses marks automatically."
    },
    {
        id: "5",
        title: "Key Takeaway #5: Stay formal",
        description: "No contractions ('don't' → 'do not'), no personal opinion ('I think'), no informal phrases ('kind of', 'a lot')."
    }
];

// ============================================
// QUICK TIPS — extended subtasks for multi-step flow
// ============================================
export const quickTipsExtendedSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Tip 1:",
        content: "",
        contentBlocks: [
            "Always paraphrase the question in your introduction. Don't copy it word-for-word — examiners ignore copied text."
        ]
    },
    {
        id: "2",
        title: "Tip 2:",
        content: "",
        contentBlocks: [
            "Use precise trend verbs: rise, climb, surge, plummet, fluctuate. They score higher than generic 'go up' / 'go down'."
        ]
    },
    {
        id: "3",
        title: "Tip 3:",
        content: "",
        contentBlocks: [
            "Group similar data together. Compare instead of listing each number separately."
        ]
    },
    {
        id: "4",
        title: "Tip 4:",
        content: "",
        contentBlocks: [
            "Save 1–2 minutes at the end to fix grammar and word count. A 145-word answer is automatically penalised."
        ]
    }
];

// ============================================
// QUICK TIPS FLOW (multi-step)
// ============================================
export const writingQuickTipsTasks: TaskConfig[] = [
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Quick Tips",
            content: "Four small habits that quickly raise your Task 1 score. Read each tip and try the quick check at the end.",
            buttonLabel: "Start Learning",
            centerIcon: "/icons/lesson-steps/quick-tips-icon.svg"
        }
    },
    {
        type: "tips",
        componentType: "TaskQuickTips",
        props: { steps: quickTipsExtendedSubTasks }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "qt-check-1",
                    taskLabel: "Task:",
                    question: "The minimum word count for Task 1 is _________.",
                    type: "fill-blank-choice",
                    options: ["100", "150", "250"],
                    answer: "150",
                    explanation: "Task 1 must be at least 150 words. Going under is automatically penalised."
                }
            ]
        }
    },
    {
        type: "recap",
        componentType: "TaskRecap",
        props: { stats: { score: 100, total: 100, time: "1:20", accuracy: 100 } }
    }
];

// ============================================
// IMPROVEMENT — vocabulary words (Figma 1:1)
// ============================================
export const improvementVocabularyWords = [
    {
        id: "vw-1",
        word: "pastime",
        phonetic: "[pa:stɪm]",
        definition: "an activity you enjoy in your free time"
    },
    {
        id: "vw-2",
        word: "unwind",
        phonetic: "[ʌnˈwaɪnd]",
        definition: "to relax and reduce stress"
    },
    {
        id: "vw-3",
        word: "recreational activity",
        phonetic: "[ˌrekrɪˈeɪʃənl ækˈtɪvəti]",
        definition: "something done for fun, not work"
    },
    {
        id: "vw-4",
        word: "crafting",
        phonetic: "[ˈkrɑːftɪŋ]",
        definition: "making things by hand as a hobby"
    },
    {
        id: "vw-5",
        word: "be absorbed in",
        phonetic: "[bi əbˈzɔːbd ɪn]",
        definition: "to be fully focused or deeply involved"
    }
];

// Match exercise pairs (id MUST be the same on left & right of the pair)
export const improvementMatchPairs = [
    { id: "vw-1", left: "pastime", right: "an activity you enjoy in your free time" },
    { id: "vw-2", left: "unwind", right: "to relax and reduce stress" },
    { id: "vw-3", left: "recreational activity", right: "something done for fun, not work" },
    { id: "vw-4", left: "crafting", right: "making things by hand as a hobby" },
    { id: "vw-5", left: "be absorbed in", right: "to be fully focused or deeply involved" }
];

// Opposite match pairs — antonyms
export const improvementOppositePairs = [
    { id: "vw-1", left: "pastime", right: "unpleasant chore" },
    { id: "vw-2", left: "unwind", right: "feel stressed" },
    { id: "vw-3", left: "recreational activity", right: "work-related task" },
    { id: "vw-4", left: "crafting", right: "boring" },
    { id: "vw-5", left: "be absorbed in", right: "lose interest in" }
];

// ============================================
// IMPROVEMENT FLOW (Figma 1:1)
// ============================================
export const writingImprovementTasks: TaskConfig[] = [
    // Step 1: Intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Improvement",
            content: "Listen and repeat each word or phrase. Focus on pronunciation and meaning.",
            buttonLabel: "Next",
            centerIcon: "/icons/lesson-steps/Improvement.svg",
            segments: { total: 5, active: 1 }
        }
    },
    // Step 2: Vocabulary cards (5 words, internal navigation)
    {
        type: "vocabulary",
        componentType: "TaskVocabularyCard",
        props: {
            words: improvementVocabularyWords,
            segments: { total: 5, active: 2 }
        }
    },
    // Step 3: Match each word with its definition
    {
        type: "matching",
        componentType: "TaskMatching",
        props: {
            instruction: "Match each word with its definition",
            pairs: improvementMatchPairs,
            progress: 25
        }
    },
    // Step 4: Opposite match
    {
        type: "matching",
        componentType: "TaskMatching",
        props: {
            instruction: "Match each word with its definition",
            pairs: improvementOppositePairs,
            progress: 25
        }
    },
    // Step 5: Reading + fill-in-the-gaps
    {
        type: "reading-fill",
        componentType: "TaskReadingExercise",
        props: {
            instruction: "Read the text and fill in the gaps.",
            passage: {
                paragraphs: [
                    {
                        id: "imp-para-1",
                        title: "",
                        text: "In many countries, people are spending more of their free time on hobbies, and the growing (1) ____ of online activities has changed how people relax. While some individuals prefer social pastimes, others enjoy quiet hobbies that help them (2) ____ after a long day. Younger people in particular often choose competitive gaming or creative outlets, whereas older adults may prefer a simple (3) ____ such as reading or gardening. Whatever the choice, hobbies continue to play an important (4) ____ in maintaining mental wellbeing."
                    }
                ]
            },
            questions: [
                {
                    id: "gap-1",
                    text: "1",
                    type: "multiple-choice",
                    options: ["wave", "trend", "group", "rise"],
                    answer: "trend"
                },
                {
                    id: "gap-2",
                    text: "2",
                    type: "multiple-choice",
                    options: ["collect", "engage", "compete", "unwind"],
                    answer: "unwind"
                },
                {
                    id: "gap-3",
                    text: "3",
                    type: "multiple-choice",
                    options: ["task", "pastime", "duty", "job"],
                    answer: "pastime"
                },
                {
                    id: "gap-4",
                    text: "4",
                    type: "multiple-choice",
                    options: ["role", "block", "delay", "burden"],
                    answer: "role"
                }
            ],
            progress: 25
        }
    }
];

// ============================================
// PRACTICE FLOW (multi-step)
// ============================================
export const writingPracticeTasks: TaskConfig[] = [
    {
        type: "presentation",
        componentType: "TaskIntro",
        props: {
            title: "Practice",
            content: "This practice session develops vocabulary and accuracy for IELTS-style tasks through sentence completion, vocabulary selection, and error identification exercises.\nLet's walk inside…",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/Practice-icon.svg"
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "p-q1",
                    taskLabel: "Choose the correct answer.",
                    question: "What is the first step you should take before writing either Task 1 or Task 2?",
                    type: "multiple-choice",
                    options: [
                        "Start writing immediately without reading the question carefully",
                        "Read the question twice to make sure you understand it fully"
                    ],
                    answer: "Read the question twice to make sure you understand it fully",
                    explanation: "Always read the prompt at least twice — misreading the task is the fastest way to lose marks on both Task 1 and Task 2."
                }
            ]
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "p-q2",
                    taskLabel: "Find the extra word and write it below",
                    question: "The graph clearly objectively shows how three pastimes changed over a five-year period.",
                    type: "fill-blank",
                    answer: "objectively",
                    cardLabel: "Sentence:",
                    explanation: "‘Clearly’ already covers the meaning — adding ‘objectively’ is redundant in formal IELTS writing."
                }
            ]
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "p-q3",
                    taskLabel: "Choose the correct vocabulary to complete each sentence",
                    question: "After long hours of studying, many students choose to _________ by watching videos or listening to music.",
                    type: "fill-blank-choice",
                    options: ["unwind", "engage", "compete"],
                    answer: "unwind",
                    cardLabel: "Sentence:",
                    explanation: "‘Unwind’ means to relax after work or stress — exactly what the sentence describes."
                }
            ]
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "p-q4",
                    taskLabel: "Choose the correct phrase to complete the overview.",
                    question: "In my free time, I enjoy the _________ that helps me unwind, especially when I can be absorbed in a good book or creative project.",
                    type: "fill-blank-choice",
                    options: ["pastime", "challenge", "task"],
                    answer: "pastime",
                    cardLabel: "Sentence:",
                    explanation: "A ‘pastime’ is a hobby or relaxing activity — the natural fit for free-time activities."
                }
            ]
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "p-q5",
                    taskLabel: "Choose the correct verb to complete the sentence.",
                    question: "Reading helps me _________ in a quiet activity that builds focus and vocabulary at the same time.",
                    type: "fill-blank-choice",
                    options: ["be absorbed", "be excited", "be tired"],
                    answer: "be absorbed",
                    cardLabel: "Sentence:",
                    explanation: "‘Be absorbed in’ is the collocation used for deep focus on an activity."
                }
            ]
        }
    },
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            title: "Lesson completed!",
            stats: { score: 5, total: 5, time: "3:20", accuracy: 100 }
        }
    }
];

// ============================================
// EXERCISES FLOW (mixed drills)
// ============================================
export const writingExercisesTasks: TaskConfig[] = [
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Exercises",
            content: "Mixed Task 1 drills — vocabulary swaps, sentence completion and comparison practice.",
            buttonLabel: "Start Exercises",
            centerIcon: "/icons/lesson-steps/Practice-icon.svg"
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "ex-1",
                    taskLabel: "Replace the informal verb",
                    question: "The figure went up sharply. → The figure _________ sharply.",
                    type: "fill-blank-choice",
                    options: ["surged", "did go up", "was upping"],
                    answer: "surged",
                    explanation: "'Surged' is a strong, precise trend verb that scores higher than 'went up'."
                }
            ]
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "ex-2",
                    taskLabel: "Fill in the gap",
                    question: "Task 1 must be at least _________ words.",
                    type: "fill-blank",
                    answer: "150",
                    explanation: "Going below 150 words is automatically penalised, so always aim for 160–180."
                }
            ]
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "ex-3",
                    taskLabel: "Choose the better connector",
                    question: "Sales rose by 20%, _________ profits dropped slightly.",
                    type: "fill-blank-choice",
                    options: ["whereas", "and"],
                    answer: "whereas",
                    explanation: "'Whereas' shows direct contrast; 'and' is too weak for opposing trends."
                }
            ]
        }
    },
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            title: "Lesson completed!",
            stats: { score: 3, total: 3, time: "2:15", accuracy: 100 }
        }
    }
];

// ============================================
// SUMMARY FLOW
// ============================================
export const writingSummaryTasks: TaskConfig[] = [
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Summary",
            content: "Quick recap of everything you practised about Task 1 today.",
            buttonLabel: "Next",
            centerIcon: "/icons/lesson-steps/summary-icon.svg"
        }
    },
    {
        type: "presentation",
        componentType: "TaskPresentation",
        props: {
            steps: [
                {
                    id: "summary-writing",
                    title: "Recap",
                    content: "In this session you practised:\n\n• Planning in 3 steps before writing\n• Using precise trend verbs and adverbs\n• Comparing data with whereas, while, compared to\n• Hitting the 150-word minimum (aim 160–180)\n• Keeping the tone formal — no contractions, no opinion\n\nApply the formula on every Task 1 prompt and your score will rise quickly.",
                    example: ""
                }
            ],
            buttonLabel: "Finish"
        }
    }
];
