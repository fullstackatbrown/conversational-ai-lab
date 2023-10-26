export type UserRole = "admin" | "writer" | "reader";
export type PostType = "blog" | "forum";
export type ForumType = "announcement" | "question";

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
  // future fields:
  // projects, discoveries, resume, links
  profileUrl: string;
}

export const dummyUserData: UserData = {
  uid: "",
  email: "",
  joined: new Date(),
  lastLogin: new Date(),
  userName: "",
  bio: "",
  role: "reader" as UserRole,
  postIds: [],
  profileUrl: ""
};

export const dummyBlog : Post = {
  uid: "",
  created: new Date(),
  lastUpdated: new Date(),
  title: "",
  textContent: "",
  videoUrl: "",
  published: false,
  publishedOn: new Date(),
  publishedBy: "",
  postType: "blog",
}

export const dummyPost: Post = {
  uid: "",
  created: new Date(),
  lastUpdated: new Date(),
  title: "",
  textContent: "",
  videoUrl: "",
  published: false,
  publishedOn: new Date(),
  publishedBy: "",
  postType: "Forum",
}

export interface Post {
  uid: string;
  created: Date;
  lastUpdated: Date;
  title: string;
  textContent: string;
  videoUrl?: string;
  published: boolean;
  publishedOn?: Date;
  publishedBy?: string;
  postType: string;
  forumType?: string;
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

