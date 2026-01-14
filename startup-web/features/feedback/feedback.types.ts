export interface Feedback {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateFeedbackInput {
    title: string;
    content: string;
    userId: string;
}

export interface UpdateFeedbackInput {
    title?: string;
    content?: string;
}
