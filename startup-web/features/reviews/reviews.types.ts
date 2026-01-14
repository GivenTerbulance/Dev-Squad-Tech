export interface Review {
    id: string;
    rating: number;
    comment?: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateReviewInput {
    rating: number;
    comment?: string;
    userId: string;
}

export interface UpdateReviewInput {
    rating?: number;
    comment?: string;
}
