export type UserRole = "admin" | "writer" | "reader";
export type PostType = "blog" | "forum";
export type ForumType = "announcement" | "question";

import { Content, JSONContent } from "@tiptap/react";
import { Timestamp } from "firebase/firestore/lite";

export const dateNow = new Date(Date.now()).toDateString();

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
  profileUrl: "",
};

export const dummyBlog: Post = {
  id: "",
  uid: "",
  created: dateNow,
  lastEdited: dateNow,
  title: "New Post",
  textContent: "Start writing your post here!",
  richTextContent: "<p>Start writing your post here!</p>",
  videoUrl: "",
  published: false,
  publishedOn: dateNow,
  publishedBy: "",
  postType: "blog",
};

export const dummyPost: Post = {
  id: "",
  uid: "",
  created: dateNow,
  lastEdited: dateNow,
  title: "",
  textContent: "",
  richTextContent: "",
  videoUrl: "",
  published: false,
  publishedOn: dateNow,
  publishedBy: "",
  postType: "forum",
};

export interface Post {
  id: string;
  uid: string;
  created: string;
  lastEdited: string;
  title: string;
  textContent: string;
  richTextContent: string | undefined;
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
