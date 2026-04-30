import { CourseTheme, TaskConfig, PresentationStep, PresentationTabsData, PracticeQuestion, SummaryPoint } from "@/types";

export const listeningTheme: CourseTheme = {
    primaryColor: "#884DDF",
    gradient: "linear-gradient(180deg, #CCA9FF 0%, #884DDF 100%)",
    shadowColor: "rgba(136, 77, 223, 0.4)",
    lightBg: "#F3ECFF",
    bgGradient: "from-[#F3ECFF] via-white to-white"
};

// ============================================
// LEAD-IN TASKS (7 frames per Figma)
// Units & Sessions → Understanding intro → 3× Exercise → Congrats
// ============================================
export const listeningLeadInTasks: TaskConfig[] = [
    // Step 1: Learning Outcomes
    {
        type: "outcomes",
        componentType: "TaskIntro",
        props: {
            showOutcomes: true,
            title: "Learning outcomes",
            outcomesTitle: "Learning outcomes",
            outcomesSubtitle: "By the end of this session, you will be able to ...",
            learningPoints: [
                {
                    icon: "1",
                    iconColor: "#3B82F6",
                    title: "Understanding",
                    description: "Understand \"context\" in IELTS Listening."
                },
                {
                    icon: "2",
                    iconColor: "#22C55E",
                    title: "Recognizing",
                    description: "Recognizing paraphrased clues."
                },
                {
                    icon: "3",
                    iconColor: "#F97316",
                    title: "Identifying",
                    description: "Identify who is talking, where they are and why they are talking."
                }
            ],
            buttonLabel: "Start The Session"
        }
    },
    // Step 2: Lead-in Introduction
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Lead-in",
            content: "Each set contains three statements. Two are true based on factual information, and one is intentionally false. Select the statement that does not accurately reflect factual information.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/lead-in-icon.svg"
        }
    },
    // Step 3: Exercise 1 — Right/Wrong
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "lead-rw-1",
                    taskLabel: "Check if the sentence is right or wrong",
                    question: "In Part 1, the conversation is always formal.",
                    type: "multiple-choice",
                    options: ["Right", "Wrong"],
                    answer: "Wrong",
                    explanation: "Part 1 of the IELTS Listening test is usually a casual, everyday conversation (e.g. a phone enquiry), not a formal one."
                }
            ]
        }
    },
    // Step 4: Exercise 2 — Right/Wrong
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "lead-rw-2",
                    taskLabel: "Check if the sentence is right or wrong",
                    question: "Part 4 is a monologue on an academic topic.",
                    type: "multiple-choice",
                    options: ["Right", "Wrong"],
                    answer: "Right",
                    explanation: "Part 4 of IELTS Listening is a single-speaker academic lecture or talk."
                }
            ]
        }
    },
    // Step 5: Exercise 3 — Right/Wrong
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "lead-rw-3",
                    taskLabel: "Check if the sentence is right or wrong",
                    question: "You can listen to the IELTS Listening recording twice.",
                    type: "multiple-choice",
                    options: ["Right", "Wrong"],
                    answer: "Wrong",
                    explanation: "The IELTS Listening recording is played only once. You must catch the answers the first time."
                }
            ]
        }
    },
    // Step 6: Recap (Congrats)
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: {
                score: 5,
                total: 5,
                time: "3:21",
                accuracy: 98
            }
        }
    }
];

// ============================================
// PRESENTATION (Figma-aligned: intro + multi-tab content)
// ============================================
export const listeningPresentationTabs: PresentationTabsData = {
    intro: {
        title: "Presentation",
        description:
            "This lesson teaches you how to guess what is happening in the conversation by using context clues. It is like a detective looking for the clues to solve a case. Let's try yourself as Sherlock Holmes!",
        icon: "/icons/lesson-steps/presentation-icon.svg"
    },
    contentTitle: "Listening for Context — Reading Between the Lines",
    text: {
        sections: [
            {
                heading: "Focus on meaning, not exact words",
                paragraphs: [
                    "Speakers don't always use the same words as the questions.",
                    "Example:",
                    "Question says: \"Membership\"",
                    "Speaker says: \"I'd like to join for a month.\""
                ]
            },
            {
                heading: "Use clues to understand the situation",
                bullets: [
                    "Tone: Is it friendly or formal?",
                    "Setting clues: \"Welcome to TVPlus\" = gym or club",
                    "Forced-Pacing: \"Trial\" = free session",
                    "Purpose clues: \"Can I book a class?\" = joining something"
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
        alt: "IELTS Listening: Using Context Clues"
    }
};

// Stage 3 of Listening Presentation: practice question (Figma 1:1)
export const listeningPresentationPractice: PracticeQuestion[] = [
    {
        id: "listening-pres-practice-1",
        taskLabel: "Choose the correct answer",
        question: "What does the introduction tell you?",
        type: "multiple-choice",
        options: [
            "On the answer list",
            "Meaning of the conversation"
        ],
        answer: "Meaning of the conversation",
        explanation: "The introduction sets the scene — it tells you who is speaking, where they are and why. Catching the meaning of the conversation early helps you predict the answers."
    }
];

// ============================================
// PRESENTATION TASKS (legacy text steps — kept for compatibility)
// ============================================
export const presentationSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Active Listening",
        content: "Active listening means giving the audio your full attention while quickly noting key details.\n\nIn IELTS Listening you only hear the recording once, so you need to:\n• Predict what comes next from the question wording\n• Note key words while you listen\n• Move on quickly if you miss one answer",
        example: "Question: 'How long is the tour?'\nKey words to listen for: numbers + a unit (minutes, hours).",
        tip: "Read the questions before the audio starts. This tells your brain exactly what to listen for."
    },
    {
        id: "2",
        title: "Signposts and Signal Words",
        content: "Signposts are small words that tell you what the speaker will do next. They often come right before the answer.\n\nCommon signposts:\n• First, next, finally — sequence\n• However, but, although — contrast\n• For example, such as — examples\n• So, therefore — result",
        example: "'…the museum is free. However, the special exhibition costs £5.'\nThe answer to a price question is right after 'However'.",
        tip: "When you hear a signpost, get ready — the answer is usually one breath away."
    },
    {
        id: "3",
        title: "Spelling and Numbers",
        content: "Many Listening answers are names, places, dates, prices or phone numbers. The speaker will spell or repeat them clearly.\n\n• Letters that often confuse: B/V, M/N, P/B\n• Numbers: 13 vs 30, 14 vs 40 (stress falls differently)\n• Dates: write the form the question shows ('21st June' vs '21/6')",
        example: "'My name is Halpern — that's H-A-L-P-E-R-N.'",
        tip: "Always copy spelled answers letter-by-letter into your notes, then re-read them at the end."
    }
];

// ============================================
// QUICK TIPS TASKS (Tip cards — Figma 1:1)
// ============================================
export const quickTipsSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "",
        content: "",
        contentBlocks: [
            "Identify the setting. Use clues like \"Welcome to...\" or \"How can I help?\""
        ]
    },
    {
        id: "2",
        title: "",
        content: "",
        contentBlocks: [
            "Use topic clues to predict vocabulary. If it's about a gym, expect \"trainer,\" \"membership,\" \"swimming pool.\""
        ]
    },
    {
        id: "3",
        title: "",
        content: "",
        contentBlocks: [
            "Stay ready and focused. Before listening: Read the questions carefully. While listening: Think who, where, why."
        ]
    }
];

// ============================================
// IMPROVEMENT TASKS
// ============================================
export const improvementSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Train Your Ear Daily",
        content: "Strong listening is built by short, daily practice — not by one long session a week.\n\n10–15 minutes a day with English audio (podcasts, news, TED talks, movie scenes) is more useful than two hours on Sunday.",
        image: "/icons/lesson-steps/Improvement.svg"
    },
    {
        id: "2",
        title: "Shadowing",
        content: "Shadowing means repeating a speaker's words a second after they say them.\n\nIt trains your brain to follow English at natural speed and helps you notice connected speech ('gonna', 'wanna', 'didja').\n\nHow to do it:\n• Pick a 30-second clip\n• Play it once, then play again and try to repeat exactly\n• Match the rhythm and intonation, not just the words",
        image: "/icons/lesson-steps/Improvement.svg"
    }
];

// ============================================
// PRACTICE TASKS
// ============================================
export const practiceSubTasks: PracticeQuestion[] = [
    {
        id: "1",
        question: "What should you do FIRST when a Listening section starts?",
        type: "multiple-choice",
        options: [
            "Close your eyes and concentrate",
            "Read the questions and underline key words",
            "Start writing answers from question 1",
            "Wait for the speaker to repeat the question"
        ],
        answer: "Read the questions and underline key words",
        explanation: "Reading first prepares your brain for what to listen for. The audio is played only once, so preparation is everything."
    },
    {
        id: "2",
        question: "You hear 'The library is open every day except Sunday.' The question asks when the library is closed. The answer is:",
        type: "multiple-choice",
        options: [
            "Every day",
            "Sunday",
            "Monday",
            "Saturday"
        ],
        answer: "Sunday",
        explanation: "'Except' is a signal of exception — it points directly to the answer."
    },
    {
        id: "3",
        question: "You missed an answer. What is the BEST thing to do?",
        type: "multiple-choice",
        options: [
            "Stop and try to remember it",
            "Write something random and refocus on the next question",
            "Pause the audio mentally",
            "Ask the supervisor to replay"
        ],
        answer: "Write something random and refocus on the next question",
        explanation: "The audio doesn't wait. Make a quick guess, leave the question marked and keep up with the speaker."
    },
    {
        id: "4",
        question: "Which signal word usually comes BEFORE an important answer?",
        type: "multiple-choice",
        options: [
            "And",
            "Or",
            "However",
            "Also"
        ],
        answer: "However",
        explanation: "'However' introduces a contrast or correction — IELTS often hides the right answer right after it."
    },
    {
        id: "5",
        question: "You should always listen for the EXACT words used in the question.",
        type: "multiple-choice",
        options: [
            "True",
            "False"
        ],
        answer: "False",
        explanation: "IELTS paraphrases. The audio uses synonyms and different sentence structures, so listen for meaning, not the same words."
    }
];

// ============================================
// SUMMARY (Key Takeaways)
// ============================================
export const summarySubTasks: SummaryPoint[] = [
    {
        id: "1",
        title: "Key Takeaway #1: Read questions first",
        description: "Always read and underline questions before the audio starts. It tells your brain exactly what to catch."
    },
    {
        id: "2",
        title: "Key Takeaway #2: Follow the signposts",
        description: "Words like 'however', 'for example', 'finally' are warning lights — the answer is usually right after them."
    },
    {
        id: "3",
        title: "Key Takeaway #3: Don't get stuck",
        description: "If you miss an answer, write a quick guess and keep going. One missed question must not cost you three more."
    },
    {
        id: "4",
        title: "Key Takeaway #4: Numbers and spellings",
        description: "Be careful with 13/30, 14/40, similar letters (B/V, M/N). Always re-check spelled answers at the end."
    },
    {
        id: "5",
        title: "Key Takeaway #5: Practice daily",
        description: "10–15 minutes a day with English audio beats one long weekend session. Use shadowing to lock in speed and rhythm."
    }
];

// ============================================
// QUICK TIPS FLOW (multi-step)
// ============================================
export const listeningQuickTipsTasks: TaskConfig[] = [
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Quick Tips",
            content: "Applying simple exam strategies can help you perform more confidently under time pressure. Here are some quick tips.",
            buttonLabel: "Next",
            centerIcon: "/icons/lesson-steps/quick-tips-icon.svg"
        }
    },
    {
        type: "tips",
        componentType: "TaskQuickTips",
        props: {
            steps: quickTipsSubTasks
        }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "qt-check-1",
                    taskLabel: "Choose the correct answer.",
                    question: "What does the introduction tell you?",
                    type: "multiple-choice",
                    options: [
                        "Speaker's age",
                        "Talk purpose"
                    ],
                    answer: "Talk purpose",
                    explanation: "The introduction sets the scene — it tells you the purpose of the talk and the situation, not personal details about the speaker."
                }
            ]
        }
    },
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: { score: 100, total: 100, time: "1:20", accuracy: 100 }
        }
    }
];

// ============================================
// IMPROVEMENT VOCABULARY (listening context vocab — UZ translations)
// ============================================
export const listeningImprovementVocabulary = [
    {
        id: "liv-1",
        word: "Annual",
        phonetic: "(ænjuəl)",
        definition: "Yillik"
    },
    {
        id: "liv-2",
        word: "Membership",
        phonetic: "(membəʃɪp)",
        definition: "A'zolik"
    },
    {
        id: "liv-3",
        word: "Enquiry",
        phonetic: "(ɪnˈkwaɪri)",
        definition: "So'rov"
    },
    {
        id: "liv-4",
        word: "Purpose",
        phonetic: "(pɜːpəs)",
        definition: "Maqsad"
    },
    {
        id: "liv-5",
        word: "Trial",
        phonetic: "(traɪəl)",
        definition: "Sinov"
    }
];

// ============================================
// IMPROVEMENT FLOW (multi-step)
// ============================================
export const listeningImprovementTasks: TaskConfig[] = [
    // Step 1: Intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Improvement",
            content: "Listen and repeat each word or phrase. Focus on pronunciation and meaning.",
            buttonLabel: "Next",
            centerIcon: "/icons/lesson-steps/Improvement.svg",
            segments: { total: 4, active: 1 }
        }
    },
    // Step 2: Vocabulary cards (5 words, internal navigation)
    {
        type: "vocabulary",
        componentType: "TaskVocabularyCard",
        props: {
            words: listeningImprovementVocabulary,
            segments: { total: 4, active: 2 }
        }
    },
    // Step 3: Practice — Choose the correct answer
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "imp-mc-1",
                    taskLabel: "Choose the correct answer.",
                    question: "What does the introduction tell you?",
                    type: "multiple-choice",
                    options: ["Speaker's age", "Talk purpose"],
                    answer: "Talk purpose",
                    explanation: "The introduction sets the scene — it tells you who is speaking and why (the purpose), not personal details like age."
                }
            ]
        }
    },
    // Step 4: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: { score: 5, total: 5, time: "2:10", accuracy: 100 }
        }
    }
];

// ============================================
// PRACTICE FLOW (Figma 1:1 — listen + answer)
// ============================================
export const listeningPracticeTasks: TaskConfig[] = [
    // Step 1: Practice intro (Figma 1:1)
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Practice",
            content: "This session focuses on understanding short dialogue transcripts and selecting correct answers.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/Practice-icon.svg"
        }
    },
    // Step 2: Listen and answer (single question)
    {
        type: "listen-mcq",
        componentType: "TaskListenMCQ",
        props: {
            title: "Listen and answer the questions",
            audioCurrentLabel: "00:30",
            audioDurationLabel: "01:00",
            questions: [
                {
                    id: "lp-1-q1",
                    text: "What is the woman interested in?",
                    options: ["At a restaurant", "At a fitness center", "At a cafe"],
                    answer: "At a fitness center"
                }
            ]
        }
    },
    // Step 3: Listen and answer (multiple questions on one screen)
    {
        type: "listen-mcq",
        componentType: "TaskListenMCQ",
        props: {
            title: "Listen and answer the questions",
            audioCurrentLabel: "00:30",
            audioDurationLabel: "01:00",
            questions: [
                {
                    id: "lp-2-q1",
                    text: "Where is the conversation taking place?",
                    options: ["At a restaurant", "At a fitness center", "At a cafe"],
                    answer: "At a fitness center"
                },
                {
                    id: "lp-2-q2",
                    text: "Who is the woman talking to?",
                    options: ["A friend", "A neighbor"],
                    answer: "A neighbor"
                }
            ]
        }
    },
    // Step 4: Choose the correct answer (single MCQ)
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "lp-3-q1",
                    taskLabel: "Choose the correct answer.",
                    question: "What does the introduction tell you?",
                    type: "multiple-choice",
                    options: ["Speaker's age", "Talk purpose"],
                    answer: "Talk purpose",
                    explanation: "The introduction sets the scene — it tells you the purpose of the talk and the situation, not personal details like age."
                }
            ]
        }
    },
    // Step 5: Choose the correct answer (single MCQ)
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "lp-4-q1",
                    taskLabel: "Choose the correct answer.",
                    question: "What does the introduction tell you?",
                    type: "multiple-choice",
                    options: ["Speaker's age", "Talk purpose"],
                    answer: "Talk purpose",
                    explanation: "Listen for the purpose words — \"today we'll look at\", \"in this talk\" — they signal the topic."
                }
            ]
        }
    },
    // Step 6: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            title: "Lesson completed!",
            stats: { score: 4, total: 4, time: "3:20", accuracy: 100 }
        }
    }
];

// ============================================
// EXERCISES FLOW (mixed listening drills)
// ============================================
export const listeningExercisesTasks: TaskConfig[] = [
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Exercises",
            content: "Apply what you learned. Mixed Listening drills — multiple choice, short answer and signpost spotting.",
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
                    taskLabel: "Choose the correct answer",
                    context: "Speaker: 'The deadline was Friday, but it has been extended to next Monday.'",
                    question: "What is the new deadline?",
                    type: "multiple-choice",
                    options: ["Friday", "Next Monday", "Next Friday"],
                    answer: "Next Monday",
                    explanation: "'But' signals a change. The new deadline replaces the old one."
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
                    question: "The conference room is on the _______ floor.",
                    type: "fill-blank",
                    answer: "third",
                    explanation: "Listen for ordinal numbers — they're frequent answer targets in Listening."
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
                    taskLabel: "Choose the correct answer",
                    context: "Speaker: 'You'll find the application form online — that's www dot ibrat dot uz, all lowercase.'",
                    question: "What is the URL?",
                    type: "multiple-choice",
                    options: ["ibrat.com", "ibrat.uz", "ibrat-uz.org"],
                    answer: "ibrat.uz",
                    explanation: "When the speaker spells out a URL or email, write it down letter by letter."
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
// SUMMARY FLOW (2 frames)
// ============================================
export const listeningSummaryTasks: TaskConfig[] = [
    // Step 1: Summary intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Summary",
            content: "In this session, you practiced understanding conversation context by identifying speakers, setting, and purpose.\nYou also learned to use introductions to predict topics, match people with roles or activities, and recognize paraphrasing and audio clues common in IELTS Listening Part 1.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/summary-icon.svg"
        }
    },
    // Step 2: Practice — Choose the correct answer
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "summary-mc-1",
                    taskLabel: "Choose the correct answer.",
                    cardLabel: "Task:",
                    question: "In Part 1, the talk is usually about:",
                    type: "multiple-choice",
                    options: ["Academic lectures", "Real-life situations"],
                    answer: "Real-life situations",
                    explanation: "Part 1 is a casual everyday conversation about real-life situations (e.g. enquiries, bookings). Academic lectures appear in Part 4."
                }
            ]
        }
    }
];
