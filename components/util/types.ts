export type UserRole = "admin" | "writer" | "reader";
export type PostType = "blog" | "forum";
export type ForumType = "announcement" | "question";

import { Timestamp } from "firebase/firestore/lite";

const dateNow = new Date(Date.now()).toDateString()

export interface UserData {
  uid: string;
  email: string;
  joined: string;
  lastLogin: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  pronouns?: string;
  role: UserRole;
  postIds: string[];
  // future fields:
  // projects, discoveries, resume, links
  profileUrl: string;
}

export const dummyUserData: UserData = {
  uid: "",
  email: "",
  joined: dateNow,
  lastLogin: dateNow,
  userName: "",
  bio: "",
  role: "reader" as UserRole,
  postIds: [],
  profileUrl: ""
};

export const dummyBlog : Post = {
  id: "",
  uid: "",
  created: dateNow,
  lastUpdated: dateNow,
  title: "",
  textContent: "",
  videoUrl: "",
  published: false,
  publishedOn: dateNow,
  publishedBy: "",
  postType: "blog",
}

export const dummyPost: Post = {
  id: "",
  uid: "",
  created: dateNow,
  lastUpdated: dateNow,
  title: "",
  textContent: "",
  videoUrl: "",
  published: false,
  publishedOn: dateNow,
  publishedBy: "",
  postType: "forum",
}

export interface Post {
  id: string;
  uid: string;
  created: string;
  lastUpdated: string;
  title: string;
  textContent: string;
  videoUrl?: string;
  published: boolean;
  publishedOn?: string;
  publishedBy?: string;
  postType: string;
  forumType?: string;
}

export interface CommentMetaData {
  id: string;
  authorUid: string;
  created: Timestamp;
  lastUpdated: Timestamp;
  edited: boolean;
  likes: number;
  replies: CommentMetaData[];
}

export interface CommentContent {
  metaData: CommentMetaData;
  textContent: string;
}

