import { CourseTheme, TaskConfig, PresentationStep, PresentationTabsData, PracticeQuestion, SummaryPoint } from "@/types";

export const speakingTheme: CourseTheme = {
    primaryColor: "#54B741",
    gradient: "linear-gradient(180deg, #71CC5E 0%, #54B741 100%)",
    shadowColor: "rgba(84, 183, 65, 0.4)",
    lightBg: "#F0F9F0",
    bgGradient: "from-[#F0F9F0] via-white to-white"
};

// LEAD-IN TASKS (multi-step)
export const speakingLeadInTasks: TaskConfig[] = [
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
                    description: "use adverbs of frequency (always, often, sometimes, never) to describe your free time habits"
                },
                {
                    icon: "2",
                    iconColor: "#22C55E",
                    title: "Recognizing",
                    description: "build longer, more fluent Part 1 answers by adding details about how often you do activities."
                },
                {
                    icon: "3",
                    iconColor: "#F97316",
                    title: "Identifying",
                    description: "improve accuracy and pronunciation by placing and stressing adverbs of frequency naturally in your sentences."
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
            content: "Before we begin, let's start with some simple questions to get to know you better.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/lead-in-icon.svg"
        }
    },
    // Step 3: Listening Exercise
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "lead-listen-1",
                    taskLabel: "Listen to the clue and choose the correct answer.",
                    audioClue: "He drinks coffee every single morning.",
                    question: "Pick the matching frequency adverb.",
                    type: "multiple-choice",
                    options: [
                        "He always drinks coffee",
                        "He occasionally drinks coffee."
                    ],
                    answer: "He always drinks coffee",
                    explanation: "'Every single morning' = always. 'Occasionally' would mean only sometimes."
                }
            ]
        }
    },
    // Step 4: Speaking Exercise
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Answer the question",
            question: "How often do you watch TV or movies in the evening?",
            helperLabel: "Use one of these words:",
            helperText: "always, usually, often, sometimes, occasionally, hardly ever, never.",
            transcript: "In the evening, I usually watch TV or movies to relax. I often watch something after dinner, especially on weekdays. Sometimes I watch a movie, but occasionally I prefer reading or listening to music instead. I hardly ever watch TV very late at night, and I never watch it when I have a lot of work to do. On weekends, I always try to enjoy at least one good movie.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    // Step 5: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: { score: 2, total: 2, time: "1:30", accuracy: 100 }
        }
    }
];

// ============================================
// PRESENTATION (Figma-aligned: intro + multi-tab content)
// ============================================
export const speakingPresentationTabs: PresentationTabsData = {
    intro: {
        title: "Presentation",
        description:
            "At this stage, the examiner asks simple, personal questions to help candidates relax and begin speaking naturally.",
        icon: "/icons/lesson-steps/presentation-icon.svg"
    },
    contentTitle: "Applying Adverbs of Frequency to Describe Free Time Habits",
    text: {
        intro: "Imagine the examiner asks you in IELTS Part 1:",
        sections: [
            {
                heading: "What do you usually do in your free time?",
                paragraphs: [
                    "Now, if you only say:",
                    "I read books.",
                    "That's short and flat. The examiner doesn't know how often you do it."
                ]
            },
            {
                heading: "That's where adverbs of frequency help. They are little words like:",
                bullets: [
                    "always = 100% of the time",
                    "usually = almost every time",
                    "often = many times",
                    "sometimes = not always, but a few times",
                    "occasionally = once in a while",
                    "hardly ever = almost never",
                    "never = 0% of the time"
                ]
            },
            {
                heading: "These words make your answers more clear, natural, and detailed.",
                bullets: [
                    "Flat: \"I read books.\"",
                    "Better: \"I often read books in the evening.\"",
                    "Fluent: \"I often read books in the evening, especially after school because it helps me relax.\""
                ]
            },
            {
                paragraphs: [
                    "See the difference? With even small adverbs, your answer becomes longer, smoother, and much better."
                ]
            },
            {
                heading: "So, in IELTS Part 1, you should:",
                bullets: [
                    "Answer the question.",
                    "Add how often with an adverb of frequency.",
                    "Give a short reason or example."
                ]
            },
            {
                heading: "Example:",
                paragraphs: [
                    "Q: Do you like going to the cinema?",
                    "A: \"Yes, I usually go to the cinema once or twice a month with my friends. We often watch action movies because they're exciting.\""
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
        alt: "Mastering IELTS Speaking Part 1: Adverbs of Frequency"
    }
};

// Stage 3 of Speaking Presentation: practice question (Figma 1:1)
export const speakingPresentationPractice: PracticeQuestion[] = [
    {
        id: "speaking-pres-practice-1",
        taskLabel: "Choose the correct answer",
        question: "Why is the answer \"I read books\" considered flat in IELTS Speaking Part 1?",
        type: "multiple-choice",
        options: [
            "Because it doesn't say how often the activity happens.",
            "Because reading books is not a good hobby."
        ],
        answer: "Because it doesn't say how often the activity happens.",
        explanation:
            "Without an adverb of frequency, the examiner can't tell how regular the habit is — adverbs like 'often' or 'usually' make the answer richer."
    }
];

// PRESENTATION TASKS (legacy text steps — kept for compatibility)
export const presentationSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "The Part 1 Formula",
        content: "IELTS Speaking Part 1 lasts 4–5 minutes and asks personal questions about familiar topics: home, work, hobbies, food.\n\nThe winning formula for each answer:\n• ANSWER the question directly\n• Give a REASON\n• Add an EXAMPLE or DETAIL\n\nThis turns a 2-second reply into a 15-second one — exactly what examiners want.",
        example: "Q: 'Do you enjoy your job?'\nA: 'Yes, I do (answer). The work is creative (reason), and I get to design things every day, like apps and websites (example).'",
        tip: "Aim for 2–3 sentences per Part 1 answer — not more, not less."
    },
    {
        id: "2",
        title: "Useful Connectors",
        content: "Connectors glue your sentences together and make you sound fluent.\n\nFor reasons:\n• because, since, as\n\nFor examples:\n• for example, like, such as\n\nFor opinion:\n• I'd say, in my view, personally\n\nFor adding:\n• also, plus, what's more",
        example: "'I usually take the bus, since it's cheaper than driving. Plus, I can read on the way.'",
        tip: "Don't memorise long lists — just pick 3–4 favourites and use them constantly."
    },
    {
        id: "3",
        title: "Pronunciation Basics",
        content: "Examiners listen for two things:\n\n1. WORD STRESS — saying the loud part of the word correctly (REcord vs reCORD).\n2. SENTENCE STRESS — making the important word stand out (I LOVE coffee, not just any drink).\n\nBoth are far more important than having a 'British' or 'American' accent. Clarity beats accent every time.",
        example: "'I really enjoy READING because it helps me RELAX.' — stress carries the meaning.",
        tip: "Record yourself for 30 seconds. Listen back and circle the stressed words."
    }
];

// ============================================
// QUICK TIPS TASKS
// ============================================
export const quickTipsSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Put the adverb before the verb →",
        content: "",
        contentBlocks: [
            "I always drink tea in the morning."
        ]
    },
    {
        id: "2",
        title: "With the verb \"to be\", put the adverb after →",
        content: "",
        contentBlocks: [
            "She is usually tired after work."
        ]
    },
    {
        id: "3",
        title: "\"Sometimes\" and \"usually\" can also start a sentence →",
        content: "",
        contentBlocks: [
            "Sometimes, I go to the gym after class."
        ]
    },
    {
        id: "4",
        title: "Don't use two frequency adverbs together →",
        content: "",
        contentBlocks: [
            "Pick one: \"I usually read in the evening.\" — not \"I always usually read.\""
        ]
    }
];

// ============================================
// IMPROVEMENT VOCABULARY (leisure activities theme)
// ============================================
export const speakingImprovementVocabulary = [
    {
        id: "siv-1",
        word: "leisure activities",
        phonetic: "[ˈleʒə ækˈtɪvətiz]",
        definition: "things people do in their free time"
    },
    {
        id: "siv-2",
        word: "recreational facilities",
        phonetic: "[ˌrekrɪˈeɪʃənl fəˈsɪlətiz]",
        definition: "places for leisure like parks, gyms, sports centers"
    },
    {
        id: "siv-3",
        word: "pastime",
        phonetic: "[ˈpɑːstaɪm]",
        definition: "something you enjoy doing regularly in your free time"
    },
    {
        id: "siv-4",
        word: "crafting",
        phonetic: "[ˈkrɑːftɪŋ]",
        definition: "activities done for enjoyment"
    },
    {
        id: "siv-5",
        word: "recreation",
        phonetic: "[ˌrekrɪˈeɪʃən]",
        definition: "something done for fun, not work"
    }
];

export const speakingImprovementMatchPairs = [
    { id: "siv-1", left: "leisure activities", right: "things people do in their free time" },
    { id: "siv-2", left: "recreational facilities", right: "places for leisure like parks, gyms, sports centers" },
    { id: "siv-3", left: "pastime", right: "something you enjoy doing regularly in your free time" },
    { id: "siv-4", left: "crafting", right: "activities done for enjoyment" },
    { id: "siv-5", left: "recreation", right: "something done for fun, not work" }
];

export const speakingImprovementOppositePairs = [
    { id: "siv-1", left: "leisure activities", right: "work-related obligations" },
    { id: "siv-2", left: "recreational facilities", right: "formal workplace settings" },
    { id: "siv-3", left: "pastime", right: "daily duty or chore" },
    { id: "siv-4", left: "engaging", right: "boring or uninteresting" },
    { id: "siv-5", left: "recreation", right: "tiring labor" }
];

// ============================================
// IMPROVEMENT TASKS
// ============================================
export const improvementSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Record Yourself Daily",
        content: "Phones make speaking practice easy. Pick a Part 1 question, record a 30-second answer, then listen back.\n\nWhat to listen for:\n• Pauses that are too long\n• Repeated filler words ('umm', 'like')\n• Pronunciation that even YOU find unclear\n\nRe-record the same answer until it sounds smooth.",
        image: "/icons/lesson-steps/Improvement.svg"
    },
    {
        id: "2",
        title: "Build a Phrase Bank",
        content: "Don't memorise full answers — examiners spot it instantly. Instead, memorise short, flexible PHRASES you can drop into any topic.\n\nExamples:\n• 'It depends on…'\n• 'To be honest, I…'\n• 'One thing that comes to mind is…'\n• 'I don't have strong feelings about it, but…'\n\n10 phrases, used naturally, will make any answer sound stronger.",
        image: "/icons/lesson-steps/Improvement.svg"
    }
];

// ============================================
// PRACTICE TASKS
// ============================================
export const practiceSubTasks: PracticeQuestion[] = [
    {
        id: "1",
        question: "What's the BEST length for a Part 1 answer?",
        type: "multiple-choice",
        options: ["1 sentence", "2–3 sentences", "5+ sentences", "As long as possible"],
        answer: "2–3 sentences",
        explanation: "Part 1 answers should sound conversational. One sentence is too short; five is too long for Part 1."
    },
    {
        id: "2",
        question: "Which is the better start to an opinion?",
        type: "multiple-choice",
        options: ["I'd say…", "It is the case that…", "Concerning this matter…", "Frankly speaking with you…"],
        answer: "I'd say…",
        explanation: "'I'd say' is short, natural and used by native speakers in everyday English."
    },
    {
        id: "3",
        question: "If you don't understand a question, you should:",
        type: "multiple-choice",
        options: [
            "Stay silent and wait",
            "Say 'Sorry, could you repeat that?'",
            "Pretend you understood and answer randomly",
            "Switch to your native language"
        ],
        answer: "Say 'Sorry, could you repeat that?'",
        explanation: "Asking for clarification is normal. It does not lower your score."
    },
    {
        id: "4",
        question: "Which is the most useful connector for adding examples?",
        type: "multiple-choice",
        options: ["However", "For example", "Although", "On the other hand"],
        answer: "For example",
        explanation: "'For example' (or 'like', 'such as') signals that a concrete example is coming."
    },
    {
        id: "5",
        question: "Examiners care more about your accent than your clarity.",
        type: "multiple-choice",
        options: ["True", "False"],
        answer: "False",
        explanation: "IELTS does NOT score accent. Clarity, fluency and grammar are what count."
    }
];

// ============================================
// SUMMARY POINTS
// ============================================
export const summarySubTasks: SummaryPoint[] = [
    {
        id: "1",
        title: "Key Takeaway #1: Use the formula",
        description: "Answer + Reason + Example. This turns weak one-word replies into confident Part 1 answers."
    },
    {
        id: "2",
        title: "Key Takeaway #2: 2–3 sentences is enough",
        description: "Don't ramble. Aim for 10–15 seconds per answer in Part 1."
    },
    {
        id: "3",
        title: "Key Takeaway #3: Connectors carry fluency",
        description: "Master 'because', 'for example', 'I'd say', 'plus'. They make every answer flow."
    },
    {
        id: "4",
        title: "Key Takeaway #4: Clarity beats accent",
        description: "Examiners reward clear pronunciation and word stress, not a specific accent."
    },
    {
        id: "5",
        title: "Key Takeaway #5: Record and review",
        description: "30 seconds of self-recorded practice every day quickly fixes pauses, fillers and weak pronunciation."
    }
];

// ============================================
// QUICK TIPS FLOW (multi-step)
// ============================================
export const speakingQuickTipsTasks: TaskConfig[] = [
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Quick Tips",
            content: "Using adverbs of frequency will help you sound more fluent in IELTS Speaking Part 1! Here are some quick tips.",
            buttonLabel: "Start Learning",
            centerIcon: "/icons/lesson-steps/quick-tips-icon.svg"
        }
    },
    {
        type: "tips",
        componentType: "TaskQuickTips",
        props: { steps: quickTipsSubTasks }
    },
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "qt-check-1",
                    taskLabel: "Choose the correct answer",
                    question: "Which is correct?",
                    type: "multiple-choice",
                    options: [
                        "I always go jogging in the park",
                        "I go always jogging in the park"
                    ],
                    answer: "I always go jogging in the park",
                    explanation: "Frequency adverbs like \"always\" go before the main verb, not after it."
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
// IMPROVEMENT FLOW (multi-step)
// ============================================
export const speakingImprovementTasks: TaskConfig[] = [
    // Step 1: Intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Improvement",
            content: "This module helps learners improve their speaking performance by:\nBuilding confidence before the main speaking tasks. reducing anxiety and hesitation",
            buttonLabel: "Next",
            centerIcon: "/icons/lesson-steps/Improvement.svg",
            segments: { total: 5, active: 1 }
        }
    },
    // Step 2: Vocabulary cards (5 leisure activity words)
    {
        type: "vocabulary",
        componentType: "TaskVocabularyCard",
        props: {
            words: speakingImprovementVocabulary,
            segments: { total: 5, active: 2 }
        }
    },
    // Step 3: Match each word with its definition
    {
        type: "matching",
        componentType: "TaskMatching",
        props: {
            instruction: "Match each word with its definition",
            pairs: speakingImprovementMatchPairs,
            progress: 25
        }
    },
    // Step 4: Tap opposites that match each other
    {
        type: "matching",
        componentType: "TaskMatching",
        props: {
            instruction: "Tap opposites that match each other",
            pairs: speakingImprovementOppositePairs,
            progress: 50
        }
    },
    // Step 5: Speaking task
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Speaking task",
            question: "What kind of leisure activities do you enjoy most?",
            helperLabel: "Context:",
            helperText: "Answer the question using 2-3 of the new words or phrases you just learned.",
            helperFirst: true,
            transcript: "I really enjoy a wide range of leisure activities. My favourite pastime is reading because it helps me unwind after a long day. On weekends, I often visit recreational facilities like the local park or sports centre with friends. I also love crafting, especially making small gifts for my family — it's a relaxing form of recreation that keeps me focused.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used the new vocabulary naturally"
        }
    }
];

// ============================================
// PRACTICE FLOW (multi-step)
// ============================================
export const speakingPracticeTasks: TaskConfig[] = [
    // Step 1: Practice intro (Figma 1:1)
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Practice",
            content: "How to Practice This Module:\nAnswer each question using 1–2 full sentences, speak at a natural pace, not too fast, take 1–2 seconds to think before answering, focus on being clear, not perfect",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/Practice-icon.svg"
        }
    },
    // Step 2-6: Continue-the-prompt speaking exercises
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you.",
            questionLabel: "Task:",
            question: "I always …",
            helperLabel: "",
            helperText: "",
            transcript: "I always start my morning with a cup of tea and a few minutes of stretching before I check my phone.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you.",
            questionLabel: "Task:",
            question: "I usually …",
            helperLabel: "",
            helperText: "",
            transcript: "I usually meet my friends at the weekend, and we often go to a café or watch a film together.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you.",
            questionLabel: "Task:",
            question: "I sometimes …",
            helperLabel: "",
            helperText: "",
            transcript: "I sometimes cook a new recipe at home, especially when I have free time on Sunday afternoons.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you.",
            questionLabel: "Task:",
            question: "I hardly ever …",
            helperLabel: "",
            helperText: "",
            transcript: "I hardly ever stay up past midnight because I need a full night's sleep to focus the next day.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you.",
            questionLabel: "Task:",
            question: "I never …",
            helperLabel: "",
            helperText: "",
            transcript: "I never skip breakfast because it really helps me concentrate during my morning classes.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    // Step 7: Recap
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
// EXERCISES FLOW (Figma 1:1 — mixed speaking drills)
// ============================================
export const speakingExercisesTasks: TaskConfig[] = [
    // Step 1: Intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Exercises",
            content: "Mixed Speaking drills — pick the right idea, speak from prompts, listen and repeat, then complete the overview.",
            buttonLabel: "Start Exercises",
            centerIcon: "/icons/lesson-steps/Practice-icon.svg"
        }
    },
    // Step 2: Multiple-choice — why an answer is flat
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "ex-mcq-1",
                    taskLabel: "Choose the correct answer",
                    question: "Why is the answer \"I read books\" considered flat in IELTS Speaking Part 1?",
                    type: "multiple-choice",
                    options: [
                        "Because it doesn't say how often the activity happens.",
                        "Because reading books is not a good hobby."
                    ],
                    answer: "Because it doesn't say how often the activity happens.",
                    explanation: "Without an adverb of frequency the examiner can't tell how regular the habit is — adverbs add detail and lift the answer."
                }
            ]
        }
    },
    // Step 3: Speaking exercise — full Q + helper
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Answer the question",
            question: "How often do you watch TV or movies in the evening?",
            helperLabel: "Use one of these words:",
            helperText: "always, usually, often, sometimes, occasionally, hardly ever, never.",
            transcript: "In the evening, I usually watch TV or movies to relax. I often watch something after dinner, especially on weekdays. Sometimes I watch a movie, but occasionally I prefer reading or listening to music instead.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    // Step 4: Continue-the-prompt with model answer toggle
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you",
            questionLabel: "Task:",
            question: "I always …",
            helperLabel: "",
            helperText: "",
            modelAnswer: "I always do physical recreation like jogging two or three times a week.",
            transcript: "I always do physical recreation like jogging two or three times a week.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    // Step 5: Speaking with question + helper + model answer toggle
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Continue the prompts below so they are true for you.",
            question: "How often do you do something active, like sport or exercise?",
            helperLabel: "Try to use 2–3 adverbs of frequency:",
            helperText: "always, usually, often, sometimes, occasionally, hardly ever, never",
            modelAnswer: "I always do physical recreation like jogging two or three times a week.",
            transcript: "I usually go to the gym twice a week, and I often play football with my friends on weekends.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "You used frequency adverbs and new vocabulary"
        }
    },
    // Step 6: Listen to the clue and repeat (text-based audio clue)
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Listen to the clue and repeat",
            audioClue: "He drinks coffee every single morning.",
            transcript: "He drinks coffee every single morning.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "Clear pronunciation and natural rhythm"
        }
    },
    // Step 7: Listen and repeat (audio waveform clue)
    {
        type: "speaking",
        componentType: "TaskSpeakingExercise",
        props: {
            title: "Listen and repeat",
            audioWaveform: true,
            transcript: "She usually reads a book before going to bed.",
            feedbackTitle: "Good Job",
            feedbackSubtitle: "Nice intonation and timing"
        }
    },
    // Step 8: Match each word with its definition
    {
        type: "matching",
        componentType: "TaskMatching",
        props: {
            instruction: "Match each word with its definition",
            pairs: [
                { id: "ex-m-1", left: "leisure activities", right: "things people do in their free time" },
                { id: "ex-m-2", left: "recreational facilities", right: "places for leisure like parks, gyms, sports centers" },
                { id: "ex-m-3", left: "pastime", right: "something you enjoy doing regularly in your free time" },
                { id: "ex-m-4", left: "crafting", right: "activities done for enjoyment" },
                { id: "ex-m-5", left: "recreation", right: "something done for fun, not work" }
            ],
            progress: 80
        }
    },
    // Step 9: Drag the correct phrases to complete the overview (final exercise)
    {
        type: "drag-fill",
        componentType: "TaskDragFill",
        props: {
            instruction: "Drag the correct phrases to complete the overview.",
            template: "In this session, I learned how to use adverbs of ___ (always, usually, often, never) to describe my free time. I also practiced adding details and ___ to make my answers longer and more fluent. Finally, I expanded my vocabulary with words like ___ facilities, ___ activities, and ___ mental .",
            answers: ["sequencing", "reasons", "recreational", "cultural", "relaxation"],
            distractors: [],
            feedbackTitle: "Excellent!",
            feedbackSubtitle: "Overview completed correctly."
        }
    },
    // Step 10: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            title: "Lesson completed!",
            stats: { score: 8, total: 8, time: "5:40", accuracy: 100 }
        }
    }
];

// ============================================
// SUMMARY FLOW
// ============================================
export const speakingSummaryTasks: TaskConfig[] = [
    // Step 1: Summary intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Summary",
            content: "Improve accuracy and pronunciation by placing and stressing adverbs of frequency naturally in your sentences.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/summary-icon.svg"
        }
    },
    // Step 2: Drag-to-fill recap
    {
        type: "drag-fill",
        componentType: "TaskDragFill",
        props: {
            instruction: "Drag the correct phrases to complete the overview.",
            template: "In this session, I learned how to use adverbs of ___ (always, usually, often, never) to describe my free time. I also practiced adding details and ___ to make my answers longer and more fluent. Finally, I expanded my vocabulary with words like ___ facilities, ___ activities, and ___ mental.",
            answers: ["sequencing", "reasons", "recreational", "cultural", "relaxation"],
            distractors: [],
            feedbackTitle: "Excellent!",
            feedbackSubtitle: "You've completed the session recap."
        }
    }
];
