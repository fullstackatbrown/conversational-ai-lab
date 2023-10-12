export type UserRole = "admin" | "writer" | "reader";

export interface UserData {
  uid: string;
  email: string;
  joined: Date;
  lastLogin: Date;
  userName: string;
  firstName?: string;
  lastName?: string;
  bio: string;
  role: UserRole;
  postIds: string[];
}

export interface Post {
  id: string;
  userUid: string;
  created: Date;
  lastUpdated: Date;
  title: string;
  textContent: string;
  videoUrl?: string;
  published: boolean;
  publishedOn?: Date;
  publishedBy?: string;
}

export interface CommentMetaData {
  id: string;
  authorUid: string;
  created: Date;
  lastUpdated: Date;
  edited: boolean;
  likes: number;
  replies: CommentMetaData[];
}

export interface CommentContent {
  metaData: CommentMetaData;
  textContent: string;
}
