export interface MyComment {
  authorId: string;
  authorName: string;
  comment: string;
  createdAt: Date;
  rating: number;
  title: string;
  updatedAt: Date;
  _id: string;
}

export interface Opinion {
  percentage: string;
  nStart: number;
  coincidence: number;
}

export interface CommentSend {
  comment: string;
  rating: number;
  title: string;
}
