import { CourseTheme, TaskConfig, PresentationStep, PresentationTabsData, PracticeQuestion, SummaryPoint } from "@/types";

export const readingTheme: CourseTheme = {
    primaryColor: "#2D68FF",
    gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
    shadowColor: "rgba(45, 104, 255, 0.4)",
    lightBg: "#E9F2FF",
    bgGradient: "from-[#E9F2FF] via-white to-white"
};

// ============================================
// LEAD-IN TASKS (Matching Figma sequence)
// ============================================
export const readingLeadInTasks: TaskConfig[] = [
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
                    title: "Locating Key Information",
                    description: "identify key ideas and qualifiers in T/F/NG"
                },
                {
                    icon: "2",
                    iconColor: "#22C55E",
                    title: "Assessing T/F/NG",
                    description: "explain what a statement means in simple terms"
                },
                {
                    icon: "3",
                    iconColor: "#F97316",
                    title: "Supporting Your Decision",
                    description: "locate the relevant part of passage using keywords"
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
            content: "Choose the sentence that is more likely to be a fact based on the wording. Don't worry if you make a mistake.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/lead-in-icon.svg"
        }
    },
    // Step 3-6: Individual True/False Tasks (Figma 1:1)
    {
        type: "true-false",
        componentType: "TaskTrueFalse",
        props: {
            task: {
                id: "tf-1",
                title: "Select True/False",
                type: "true-false",
                metadata: {
                    instruction: "Select True/False",
                    questions: [{
                        id: "q1",
                        context: "The company was founded in 1999 by two university students",
                        task: "The company was founded by a professor in 1999",
                        options: ["True", "False"],
                        answer: "False"
                    }]
                }
            }
        }
    },
    {
        type: "true-false",
        componentType: "TaskTrueFalse",
        props: {
            task: {
                id: "tf-2",
                title: "Select True/False",
                type: "true-false",
                metadata: {
                    instruction: "Select True/False",
                    questions: [{
                        id: "q2",
                        context: "Studies show that regular exercise can improve mental health and reduce symptoms of depression.",
                        task: "Exercise has been proven to eliminate all forms of depression.",
                        options: ["True", "False"],
                        answer: "False"
                    }]
                }
            }
        }
    },
    {
        type: "true-false",
        componentType: "TaskTrueFalse",
        props: {
            task: {
                id: "tf-3",
                title: "Select True/False",
                type: "true-false",
                metadata: {
                    instruction: "Select True/False",
                    questions: [{
                        id: "q3",
                        context: "The Great Wall of China is visible from space with the naked eye.",
                        task: "Astronauts can see the Great Wall of China from space without equipment.",
                        options: ["True", "False"],
                        answer: "False"
                    }]
                }
            }
        }
    },
    {
        type: "true-false",
        componentType: "TaskTrueFalse",
        props: {
            task: {
                id: "tf-4",
                title: "Select True/False",
                type: "true-false",
                metadata: {
                    instruction: "Select True/False",
                    questions: [{
                        id: "q4",
                        context: "Vegetable oils are generally healthier than animal fats because they contain more unsaturated fatty acids.",
                        task: "All vegetable oils are healthier choice than any animal fat.",
                        options: ["True", "False"],
                        answer: "False"
                    }]
                }
            }
        }
    },
    // Step 7: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: {
                score: 4,
                total: 4,
                time: "1:45",
                accuracy: 100
            }
        }
    }
];

// ============================================
// PRESENTATION (Figma-aligned: intro + multi-tab content)
// ============================================
export const readingPresentationTabs: PresentationTabsData = {
    intro: {
        title: "Presentation",
        description: "Choose the sentence that is more likely to be a fact based on the wording. Don't worry if you make a mistake.",
        icon: "/icons/lesson-steps/presentation-icon.svg"
    },
    contentTitle: "Understanding Statements & Locating Information",
    text: {
        intro: "Read the explanation below carefully.",
        sections: [
            {
                paragraphs: [
                    "Think of this task like playing a game called \"Find the Fact.\" You're given a statement and your job is to check if it's True, False, or Not Given based on the reading passage.",
                    "But how? Let's go step by step:"
                ]
            },
            {
                heading: "Before you look at the passage, stop and ask:",
                bullets: [
                    "What is this sentence really saying?",
                    "Who or what is it about?",
                    "Is it talking about a time, number, place, person, or reason?"
                ]
            },
            {
                heading: "Example:",
                paragraphs: [
                    "Every person in the world uses the internet every day.",
                    "That's a big claim. It's about everyone, the internet, and daily use."
                ]
            },
            {
                heading: "Before you look at the passage, stop and ask:",
                paragraphs: [
                    "Now when you look at the reading passage, don't read everything — scan for important keywords or similar words."
                ]
            },
            {
                heading: "If the passage says:",
                paragraphs: [
                    "The internet is used by millions of people daily."
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

// ============================================
// PRESENTATION TASKS (legacy text steps — kept for compatibility)
// ============================================
export const presentationSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Understanding True/False/Not Given",
        content: "In IELTS Reading, you'll encounter three types of answers:\n\nTRUE - The statement agrees with the information in the passage.\nFALSE - The statement contradicts the information in the passage.\nNOT GIVEN - There is no information about this in the passage.",
        example: "Passage: 'The company was founded in 1995.'\nStatement: 'The company was established in the 20th century.'\nAnswer: TRUE (1995 is in the 20th century)",
        tip: "Don't use your general knowledge! Only use information from the passage."
    },
    {
        id: "2",
        title: "Identifying Key Words",
        content: "Key words are the most important words in a statement. They help you locate the relevant information in the passage quickly.\n\nLook for:\n• Names and proper nouns\n• Numbers and dates\n• Unique or unusual words\n• Words that cannot be easily paraphrased",
        example: "Statement: 'Dr. Smith discovered the vaccine in 2010.'\nKey words: Dr. Smith, vaccine, 2010",
        tip: "Underline key words before you start reading the passage."
    },
    {
        id: "3",
        title: "Recognizing Paraphrasing",
        content: "IELTS often paraphrases information. The statement will use different words but mean the same thing as the passage.\n\nCommon paraphrasing techniques:\n• Synonyms: big → large, important → significant\n• Word form changes: discover → discovery, quick → quickly\n• Sentence structure changes: active → passive voice",
        example: "Passage: 'The research was conducted over five years.'\nStatement: 'The study lasted half a decade.'\n(five years = half a decade)",
        tip: "Practice identifying synonyms and different ways to express the same idea."
    },
    {
        id: "4",
        title: "Dealing with Qualifiers",
        content: "Qualifiers are words that limit or modify the meaning of a statement. Pay close attention to them!\n\nCommon qualifiers:\n• all, every, always, never (absolute)\n• some, many, often, usually (partial)\n• may, might, could, possibly (uncertain)\n• must, definitely, certainly (certain)",
        example: "Passage: 'Some scientists believe climate change is accelerating.'\nStatement: 'All scientists agree climate change is accelerating.'\nAnswer: FALSE (some ≠ all)",
        tip: "A single qualifier can change the entire meaning of a statement."
    }
];

// ============================================
// QUICK TIPS TASKS
// ============================================
export const quickTipsSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "",
        content: "",
        contentBlocks: [
            "Sometimes the words look similar, but the idea is different. Always read the sentence carefully."
        ]
    },
    {
        id: "2",
        title: "",
        content: "",
        contentBlocks: [
            "Even if you know something is true, don't choose True unless the passage clearly says it."
        ]
    },
    {
        id: "3",
        title: "",
        content: "",
        contentBlocks: [
            "If you're searching too hard or feel unsure — the answer is probably Not Given."
        ]
    },
    {
        id: "4",
        title: "",
        content: "",
        contentBlocks: [
            "In T/F/NG tasks, the answers usually follow the same order as the passage."
        ]
    }
];

// ============================================
// IMPROVEMENT TASKS
// ============================================
export const improvementSubTasks: PresentationStep[] = [
    {
        id: "1",
        title: "Importance of Skimming & Scanning",
        content: "In the IELTS Reading test, you only have 60 minutes to read three long texts and answer 40 questions. That's not a lot of time! To finish on time and get good answers, you need to read smart—not slow. That's where skimming and scanning help.",
        image: "/icons/lesson-steps/presentation-icon.svg"
    },
    {
        id: "2",
        title: "Skimming",
        content: "Skimming is like flying over a text in a helicopter.\n\nYou're not reading every word—you're just looking quickly to get the main idea.\n\nUse skimming when you want to know:\nWhat is this text about?\nIs it interesting or useful for me?\n\nHow to do it:\nRead the title, headings, first sentence of each paragraph, and some key words.",
        image: "/icons/lesson-steps/presentation-icon.svg"
    },
    {
        id: "3",
        title: "Scanning",
        content: "Scanning is like using a magnifying glass to find one tiny thing. You're looking for a specific word, number, or fact.\n\nUse scanning when you want to find:\nA name\nA date\nA number\nA short fact\n\nHow to do it:\nMove your eyes quickly down the page.\nDon't read everything—just stop when you see what you need!",
        image: "/icons/lesson-steps/presentation-icon.svg"
    }
];

// ============================================
// PRACTICE TASKS
// ============================================
export const practiceSubTasks: PracticeQuestion[] = [
    {
        id: "1",
        question: "What should you do FIRST when you see True/False/Not Given questions?",
        type: "multiple-choice",
        options: [
            "Read the entire passage carefully",
            "Read all the questions and underline key words",
            "Start answering from question 1",
            "Check the time remaining"
        ],
        answer: "Read all the questions and underline key words",
        explanation: "Reading questions first helps you know what to look for in the passage, saving time and improving focus."
    },
    {
        id: "2",
        question: "If a statement says 'All scientists agree' but the passage says 'Most scientists believe', the answer is:",
        type: "multiple-choice",
        options: [
            "TRUE",
            "FALSE",
            "NOT GIVEN",
            "Cannot be determined"
        ],
        answer: "FALSE",
        explanation: "'All' and 'Most' have different meanings. The statement contradicts the passage, so it's FALSE."
    },
    {
        id: "3",
        question: "You've spent 3 minutes looking for information but can't find it. What should you do?",
        type: "multiple-choice",
        options: [
            "Keep searching until you find it",
            "Choose NOT GIVEN and move on",
            "Skip the question entirely",
            "Guess TRUE or FALSE randomly"
        ],
        answer: "Choose NOT GIVEN and move on",
        explanation: "If you can't find the information after reasonable searching, it's likely NOT GIVEN. Don't waste time."
    },
    {
        id: "4",
        question: "Which of these is a qualifier that makes a statement more absolute?",
        type: "multiple-choice",
        options: [
            "Some",
            "Many",
            "All",
            "Often"
        ],
        answer: "All",
        explanation: "'All' is an absolute qualifier meaning 100%. 'Some', 'many', and 'often' are partial qualifiers."
    },
    {
        id: "5",
        question: "True/False/Not Given questions usually appear in the same order as information in the passage.",
        type: "multiple-choice",
        options: [
            "TRUE",
            "FALSE"
        ],
        answer: "TRUE",
        explanation: "This is a key strategy! Questions typically follow the passage order, helping you locate information faster."
    }
];

// ============================================
// SUMMARY TASKS (Figma 1:1 Sequence)
// ============================================
export const readingSummaryTasks: TaskConfig[] = [
    // Step 1: Summary Intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Summary",
            content: "Choose the sentence that is more likely to be a fact based on the wording. Don't worry if you make a mistake.",
            buttonLabel: "Next",
            centerIcon: "/icons/lesson-steps/quick-tips-icon.svg" // Using the same folder icon
        }
    },
    // Step 2: Explanation
    {
        type: "presentation",
        componentType: "TaskPresentation",
        props: {
            steps: [
                {
                    id: "summary-exp-1",
                    title: "Explanation",
                    content: "Read the following summary to check what you’ve learned.\n\nIn this session, you learned how to understand the meaning of a statement and locate the part of the passage that discusses the same idea.\n\nYou practiced identifying key words, scanning for relevant information, and focusing on meaning rather than just matching words.\n\nThis is the first step to answering True / False / Not Given questions correctly.",
                    example: ""
                }
            ],
            buttonLabel: "Get Started",
            hideCompleteScreen: true
        }
    },
    // Step 3: Fill in the gaps
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "summary-fill-1",
                    taskLabel: "Fill in the gaps",
                    question: "Task: You learned how to understand the meaning of a _________.",
                    type: "fill-blank-choice",
                    options: [
                        "statement",
                        "title"
                    ],
                    answer: "statement",
                    explanation: "Understanding statements is the core skill for True/False/Not Given tasks."
                }
            ]
        }
    }
];

export const summarySubTasks: SummaryPoint[] = [
    {
        id: "1",
        title: "Key Takeaway #1: Read Questions First",
        description: "Always read the True/False/Not Given questions before the passage. Underline key words to guide your reading and save valuable time."
    },
    {
        id: "2",
        title: "Key Takeaway #2: Understand the Three Types",
        description: "TRUE = statement agrees with passage\nFALSE = statement contradicts passage\nNOT GIVEN = no information in passage\n\nNever use your general knowledge!"
    },
    {
        id: "3",
        title: "Key Takeaway #3: Watch for Qualifiers",
        description: "Pay close attention to words like 'all', 'some', 'never', 'always', 'may', 'must'. A single word can change the entire meaning of a statement."
    },
    {
        id: "4",
        title: "Key Takeaway #4: Recognize Paraphrasing",
        description: "IELTS uses synonyms and different sentence structures. The statement won't use the exact same words as the passage. Practice identifying paraphrased information."
    },
    {
        id: "5",
        title: "Key Takeaway #5: Time Management",
        description: "Spend no more than 1-2 minutes per question. If you can't find the answer quickly, choose NOT GIVEN and move on. You can return later if time permits."
    },
    {
        id: "6",
        title: "Next Steps: Practice Regularly",
        description: "Complete at least 3-4 IELTS Reading passages per week. Review your mistakes, keep an error log, and track your progress. Consistency is key to improvement!"
    }
];

// ============================================
// QUICK TIPS FLOW CONFIGURATION
// ============================================
// ============================================
// QUICK TIPS FLOW CONFIGURATION
// ============================================
// ============================================
// QUICK TIPS FLOW CONFIGURATION
// ============================================
export const readingQuickTipsTasks: TaskConfig[] = [
    // Step 1: Quick Tips Intro
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Quick Tips",
            content: "Master the True/False/Not Given questions with these essential strategies. Learn how to identify key words, spot traps, and manage your time effectively.",
            buttonLabel: "Start Learning",
            centerIcon: "/icons/lesson-steps/quick-tips-icon.svg"
        }
    },
    // Step 2: Tips (stacked animation)
    {
        type: "tips",
        componentType: "TaskQuickTips",
        props: {
            steps: quickTipsSubTasks
        }
    },
    // Step 3: Fill-in-the-gaps practice (2 tasks)
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "qt-1",
                    taskLabel: "Fill in the gap:",
                    question: "If you're not sure and can't find clear proof, the answer is probably _________.",
                    type: "fill-blank-choice",
                    options: [
                        "False",
                        "Not Given"
                    ],
                    answer: "Not Given",
                    explanation: "If you can't find clear evidence or proof in the text, the answer is almost always 'Not Given'. Don't guess 'False' unless there's a contradiction."
                },
                {
                    id: "qt-2",
                    taskLabel: "Fill in the gap:",
                    question: "Even if you know it's true, you can only choose True when the passage _________ states it.",
                    type: "fill-blank-choice",
                    options: [
                        "clearly",
                        "indirectly"
                    ],
                    answer: "clearly",
                    explanation: "Only mark True when the passage explicitly confirms the statement. If the link is vague or implied, it's Not Given, not True."
                }
            ]
        }
    },
    // Step 4: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: {
                score: 100,
                total: 100,
                time: "1:30",
                accuracy: 100
            }
        }
    }
];

// ============================================
// IMPROVEMENT FLOW CONFIGURATION
// ============================================
export const readingImprovementTasks: TaskConfig[] = [
    // Step 1: Improvement Intro (1/4 segment)
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Improvement",
            content: "Now that you've learned the basics, let's look at a few ways to improve your score.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/Improvement.svg",
            segments: { total: 4, active: 1 }
        }
    },
    // Step 2: Improvement Presentation (2/4 → 4/4)
    {
        type: "presentation",
        componentType: "TaskPresentation",
        props: {
            steps: improvementSubTasks,
            buttonLabel: "Get Started",
            segmentOffset: 1
        }
    },
    // Step 3: Improvement Practice
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "imp-1",
                    taskLabel: "Choose the correct answer",
                    context: "Some people enjoy quiet hobbies like painting, writing, gardening, or puzzles. These activities help them relax and express creativity, and are usually done alone at home.",
                    question: "What is the main idea of this passage?",
                    type: "multiple-choice",
                    options: [
                        "Some people like peaceful, independent activities to relax.",
                        "Group activities are more popular than solitary ones.",
                        "Creative hobbies are difficult to do at home."
                    ],
                    answer: "Some people like peaceful, independent activities to relax.",
                    explanation: "The passage describes quiet, solo hobbies that help people relax and be creative, which aligns with 'peaceful, independent activities'."
                }
            ]
        }
    },
    // Step 4: Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            stats: {
                score: 100,
                total: 100,
                time: "1:45",
                accuracy: 100
            }
        }
    }
];


// ============================================
// PRACTICE FLOW CONFIGURATION
// ============================================
// ============================================
// PRACTICE FLOW CONFIGURATION (Figma 1:1)
// ============================================
export const readingPracticeTasks: TaskConfig[] = [
    // Step 1: Intro (1/2 segment)
    {
        type: "intro",
        componentType: "TaskIntro",
        props: {
            title: "Practice",
            content: "Apply what you've learned. Read the passage carefully and answer the True/False/Not Given questions.",
            buttonLabel: "Get Started",
            centerIcon: "/icons/lesson-steps/Practice-icon.svg",
            segments: { total: 2, active: 1 }
        }
    },
    // Step 2: Explanation (2/2 segment)
    {
        type: "explanation",
        componentType: "TaskExplanation",
        props: {
            title: "Explanation",
            question: "Do the following statements agree with the information given in the reading passage above?",
            listIntro: "Select:",
            options: [
                { label: "TRUE", description: "if the statement agrees with the information" },
                { label: "FALSE", description: "if the statement contradicts the information" },
                { label: "NOT GIVEN", description: "if there is no information on this" }
            ],
            buttonLabel: "Get Started",
            segments: { total: 2, active: 2 }
        }
    },
    // Step 3: Reading Exercise
    {
        type: "practice",
        componentType: "TaskReadingExercise",
        props: {
            passage: {
                title: "Leisure Time",
                paragraphs: [
                    {
                        id: "para-a",
                        title: "Paragraph A",
                        text: "In today's busy world, people are encouraged to take breaks and enjoy their leisure time. This can include activities like walking, reading, or spending time with friends. Leisure time is important for mental and emotional well-being. Some schools and companies are also beginning to promote short rest periods during the day to help reduce stress."
                    },
                    {
                        id: "para-b",
                        title: "Paragraph B",
                        text: "Some individuals prefer quiet, solitary leisure activities such as painting, writing, gardening, or doing puzzles. These hobbies help people relax, reflect, and express themselves creatively. Unlike group activities, these do not require interaction with others and are often done at home."
                    },
                    {
                        id: "para-c",
                        title: "Paragraph C",
                        text: "Others prefer social activities during their free time. Playing team sports, going to the cinema, or attending community events are popular ways to connect with others. Some people also enjoy attending group fitness classes or weekend picnics with family and friends."
                    }
                ]
            },
            questions: [
                {
                    id: "q1",
                    text: "People are encouraged to take breaks during their busy lives.",
                    options: ["True", "False", "Not Given"],
                    answer: "True"
                },
                {
                    id: "q2",
                    text: "Gardening is considered a quiet activity that can be done alone.",
                    options: ["True", "False", "Not Given"],
                    answer: "True"
                },
                {
                    id: "q3",
                    text: "Leisure time has no impact on emotional well-being.",
                    options: ["True", "False", "Not Given"],
                    answer: "False"
                },
                 {
                    id: "q4",
                    text: "Most people prefer team sports over solo activities.",
                    options: ["True", "False", "Not Given"],
                    answer: "Not Given"
                }
            ]
        }
    },
    // Step 3: Test Result
    {
        type: "recap",
        componentType: "TaskResult",
        props: {
            stats: { score: 8, total: 10 },
            incorrectAnswers: [
                {
                    question: "People are encouraged to take breaks during their busy lives.",
                    userAnswer: "False",
                    correctAnswer: "True"
                },
                {
                    question: "Gardening is considered a quiet activity that can be done alone.",
                    userAnswer: "False",
                    correctAnswer: "True"
                }
            ]
        }
    },
    // Step 4: Final Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            title: "Lesson completed!",
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
// EXERCISES FLOW CONFIGURATION (Figma 1:1)
// ============================================
export const readingExercisesTasks: TaskConfig[] = [
    // Step 1: True/False/Not Given Card (intro removed — exercises start directly)
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "ex-1",
                    taskLabel: "Select True/False/Not Given",
                    context: "Experts agree that drinking green tea may reduce stress levels",
                    question: "Task: Drinking green tea always reduces stress",
                    type: "multiple-choice",
                    options: ["True", "False", "Not Given"],
                    answer: "False",
                    explanation: "The passage says 'may reduce', while the statement says 'always reduces'. These are contradictions."
                }
            ]
        }
    },
    // Step 3: Main Idea MCQ Card
    {
        type: "practice",
        componentType: "TaskPractice",
        props: {
            steps: [
                {
                    id: "ex-2",
                    taskLabel: "Select True/False/Not Given",
                    question: "Question: What is the main idea of this passage?",
                    type: "multiple-choice",
                    options: [
                        "Some people like peaceful, independent activities to relax.",
                        "Group activities are more popular than solitary ones.",
                        "Creative hobbies are difficult to do at home."
                    ],
                    answer: "Some people like peaceful, independent activities to relax.",
                    explanation: "The passage focus on solitary hobbies like painting and gardening as ways to relax."
                }
            ]
        }
    },
    // Step 4: Paragraph Matching (Split View)
    {
        type: "reading-exercise",
        componentType: "TaskReadingExercise",
        props: {
            instruction: "Read the passage and select the correct paragraph.",
            passage: {
                title: "",
                paragraphs: [
                    {
                        id: "para-a",
                        title: "Paragraph A",
                        text: "In today's busy world, people are encouraged to take breaks and enjoy their leisure time. This can include activities like walking, reading, or spending time with friends. Leisure time is important for mental and emotional well-being. Some schools and companies are also beginning to promote short rest periods during the day to help reduce stress."
                    },
                    {
                        id: "para-b",
                        title: "Paragraph B",
                        text: "Some individuals prefer quiet, solitary leisure activities such as painting, writing, gardening, or doing puzzles. These hobbies help people relax, reflect, and express themselves creatively. Unlike group activities, these do not require interaction with others and are often done at home."
                    },
                    {
                        id: "para-c",
                        title: "Paragraph C",
                        text: "Others prefer social activities during their free time. Playing team sports, going to the cinema, or attending community events are popular ways to connect with others. Some people also enjoy attending group fitness classes or weekend picnics with family and friends."
                    }
                ]
            },
            questions: [
                {
                    id: "pm-1",
                    text: "Designing for Accessibility: Making Products Inclusive",
                    type: "select-paragraph",
                    options: ["Paragraph A", "Paragraph B", "Paragraph C"],
                    answer: "Paragraph B"
                }
            ]
        }
    },
    // Step 5: Short Answer (Split View)
    {
        type: "reading-exercise",
        componentType: "TaskReadingExercise",
        props: {
            instruction: "Read the passage and write no more than two words in each gap.",
            passage: {
                title: "",
                paragraphs: [
                    {
                        id: "para-a",
                        title: "Paragraph A",
                        text: "In today's busy world, people are encouraged to take breaks and enjoy their leisure time. This can include activities like walking, reading, or spending time with friends. Leisure time is important for mental and emotional well-being. Some schools and companies are also beginning to promote short rest periods during the day to help reduce stress."
                    },
                    {
                        id: "para-b",
                        title: "Paragraph B",
                        text: "Some individuals prefer quiet, solitary leisure activities such as painting, writing, gardening, or doing puzzles. These hobbies help people relax, reflect, and express themselves creatively. Unlike group activities, these do not require interaction with others and are often done at home."
                    },
                    {
                        id: "para-c",
                        title: "Paragraph C",
                        text: "Others prefer social activities during their free time. Playing team sports, going to the cinema, or attending community events are popular ways to connect with others. Some people also enjoy attending group fitness classes or weekend picnics with family and friends."
                    }
                ]
            },
            questions: [
                {
                    id: "sa-1",
                    text: "1. Always ___________ the statement before looking for the answer in the passage",
                    type: "short-answer",
                    answer: "read",
                    placeholder: "Write your answer"
                }
            ]
        }
    },
    // Step 6: Final Recap
    {
        type: "recap",
        componentType: "TaskRecap",
        props: {
            title: "Lesson completed!",
            stats: {
                score: 10,
                total: 10,
                time: "5:15",
                accuracy: 100
            }
        }
    }
];
