/**
 * Centralized endpoint registry. Confirmed against staging via Postman rounds 1–4.
 * When backend confirms anything new, change it here only — services/hooks stay the same.
 */
export const endpoints = {
  auth: {
    sendOtp: "/users/login-with-otp",
    verifyOtp: "/users/verify-with-otp",
    googleLogin: "/users/login-with-google",
    logout: "/users/logout",
    register: "/users/register",
    exists: "/users/exists",
  },
  user: {
    me: "/user-profile",
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    activity: "/users/activity",
    rewards: "/rewards/user",
  },
  avatar: {
    create: "/avatar",
    update: (id: string) => `/avatar/${id}`,
    delete: (id: string) => `/avatar/${id}`,
    list: "/avatar",
  },
  fileUpload: "/file-upload",
  practicums: {
    public: "/practicums/public",
    detail: (id: string) => `/practicums/${id}`,
    modules: (id: string) => `/practicums/${id}/modules`,
    enrolled: (studentId: string) => `/students/${studentId}/practicums`,
  },
  lessons: {
    list: (practicumId: string, moduleId: string) =>
      `/practicums/${practicumId}/modules/${moduleId}/lessons`,
    detail: (practicumId: string, moduleId: string, lessonId: string) =>
      `/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}`,
    studentDetail: (
      studentId: string,
      practicumId: string,
      moduleId: string,
      lessonId: string,
    ) =>
      `/students/${studentId}/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}`,
  },
  quiz: {
    start: (practicumId: string, moduleId: string, lessonId: string) =>
      `/students/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}/quiz/start`,
    finish: (practicumId: string, moduleId: string, lessonId: string) =>
      `/students/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}/quiz/finish`,
    reset: (practicumId: string, moduleId: string, lessonId: string) =>
      `/students/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}/quiz/reset`,
    /** Submit quiz answers. Confirmed via Postman audit (2026-04-30). */
    complete: (practicumId: string, moduleId: string, lessonId: string) =>
      `/students/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}/quiz/complete`,
    analyzeSpeech: (
      practicumId: string,
      moduleId: string,
      lessonId: string,
      questionId: string,
    ) =>
      `/students/practicums/${practicumId}/modules/${moduleId}/lessons/${lessonId}/quiz/questions/${questionId}/analyze-speech`,
  },
  progress: {
    overall: "/students/track/practicums/progress/",
  },
  streak: {
    current: "/streaks/current",
    targets: "/streaks/targets",
    checkIn: "/streaks/check-in",
    recovery: "/streaks/recovery",
    leaderboard: "/streaks/leaderboard",
  },
  plans: {
    list: "/plans",
    detail: (id: string) => `/plans/${id}`,
    me: "/plans/me",
  },
  challenges: {
    list: "/challenges/",
    join: (id: string) => `/challenges/${id}/join`,
  },
  notifications: {
    list: "/notifications",
    all: "/notifications/all",
    unreadCount: "/notifications/unread/count",
    read: (id: string) => `/notifications/read/${id}`,
    templates: "/notifications/templates",
  },
} as const;
