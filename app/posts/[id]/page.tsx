"use client";
import { firebaseApp } from "@/firebaseClient";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Post,
  UserData,
  dateNow,
  dummyPost,
  dummyUserData,
} from "@/components/util/types";
import { getPostData, updatePost } from "@/components/util/postFunctions";
import PageShell from "@/components/PageShell";
import { getUserData } from "@/components/util/userDBFunctions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor } from "@tinymce/tinymce-react";
import Heading from "@tiptap/extension-heading";
import {
  Content,
  EditorProvider,
  JSONContent,
  useCurrentEditor,
  FloatingMenu,
  BubbleMenu,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { filledInputClasses } from "@mui/material";

function EditPost(props: {
  pid: string;
  postData: Post;
  onSave: (post: Post) => void;
}) {
  const postData = props.postData;
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState(postData.textContent);

  const handleSave = () => {
    if (title != "") {
      const updatedPost = {
        ...postData,
        title: title,
        textContent: body,
      };

      props.onSave(updatedPost);
    }
  };
}

function htmlToPlainText(htmlString: string): string {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
}


interface PostDataProps {
  postData: Post;
  authorData: UserData;
  body: string;
}

const PostData = ({ postData, authorData, body }: PostDataProps) => {
  const lastUpdated = new Date(postData.lastEdited);
  const [readTime, setReadTime] = useState<number>();

  useEffect(() => {
    const wordsPerMinute = 200;
    setReadTime(Math.ceil(body.split(" ").length / wordsPerMinute));
  }, [body]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <img
          className="h-[59px] w-[59x] rounded-full"
          referrerPolicy="no-referrer"
          src={authorData.profileUrl}
          alt=""
        />
        <div className="flex flex-col">
          <h2 className="mt-1 text-lg font-semibold">
            {authorData.firstName
              ? authorData.firstName + " " + authorData.lastName
              : authorData.userName}
          </h2>
          <h2 className="m-0 text-base text-[#6c6c6c]">{authorData.role}</h2>
        </div>
      </div>
      <hr className="w-full h-1 mt-[21px]" />
      <div className="flex flex-row justify-between my-[14px] mx-[60px]">
        <p className="my-0 text-base text-[#6c6c6c]">
          {readTime && readTime + " min read"}{" "}
          <span className="text-xl font-[300]">|</span>{" "}
          {lastUpdated.toDateString()}
        </p>
        <div>Comment</div>
      </div>
      <hr className="w-full h-1" />
    </>
  );
};

interface MenuBarProps {
  editMode: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ editMode }) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    editor?.setEditable(editMode);
  }, [editMode]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-20 items-center justify-start gap-2">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active text-gray-900 bg-gray-300 font-bold py-2 px-4 rounded"
            : "text-gray-500 font-bold py-2 px-4 rounded"
        }
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active text-gray-900 bg-gray-300 font-bold py-2 px-4 rounded"
            : "text-gray-500 font-bold py-2 px-4 rounded"
        }
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active text-gray-900 bg-gray-300 font-bold py-2 px-4 rounded"
            : "text-gray-500 font-bold py-2 px-4 rounded"
        }
      >
        i
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active text-gray-900 bg-gray-300 font-bold py-2 px-4 rounded"
            : "text-gray-500 font-bold py-2 px-4 rounded"
        }
      >
        Code
      </button>
    </div>
  );
};

function PostAuthed(props: { pid: string; uid: string }) {
  const [uid, setUid] = useState<string>(props.uid);
  const [postData, setPostData] = useState<Post>(dummyPost);
  const [authorData, setAuthorData] = useState<UserData>(dummyUserData);
  const [editable, setEditable] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const auth = getAuth(firebaseApp);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [richTextContent, setRichTextContent] = useState<string>();

  useEffect(() => {
    console.log(richTextContent)
  }, [richTextContent])

  useEffect(() => {
    setUid(props.uid);
  }, [props.uid]);

  useEffect(() => {
    getPostData(props.pid).then((data: Post) => {
      setPostData(data);
      setTitle(data.title);
      setBody(data.textContent);
      setRichTextContent(data.richTextContent);
      getUserData(data.uid).then((userData: UserData) => {
        setAuthorData(userData);
      });
      if (data.uid == uid) {
        setEditable(true);
      }
    });
  }, [uid]);

  const handleSave = () => {
    setEditMode(false);
    const updatedPost = {
      ...postData,
      title: "testtest",
      textContent: body,
      richTextContent: richTextContent,
      lastEdited: dateNow,
    };
    updatePost(props.pid, updatedPost);
  };
  
  function checkAndSetRichTextContent(newContent : string){
    if(newContent != ""){
    setRichTextContent(newContent)
    } else {
      setRichTextContent(" ");
    }
  }

  const router = useRouter();
  return (
    <div className="mx-[138px]">
      <div
        className=" flex items-center mt-10 cursor-pointer"
        onClick={() => router.push("/posts")}
      >
        <ChevronLeftIcon className="h-6 w-6" />
        <p>Back to posts</p>
      </div>
      <div className="mt-[60px] mb-[58px] my-0">
        {editMode ? (
          <div className="flex">
            <div className="flex items-center border-r-2 mr-2">
              <p className="text-lg mr-2 text-gray-500 "> Title</p>
            </div>
            <input
              className="h-[2.5rem] w-full text-4xl font-[700] text-gray-500 outline-none"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        ) : (
          <h1
            className="text-4xl font-[700]"
            onDoubleClick={() => editable && setEditMode(true)}
          >
            {title}
          </h1>
        )}
      </div>
      <PostData body={body} postData={postData} authorData={authorData} />
      {editable && (
        <div>
        <button
          className={`mt-2.5 p-2 bg-[#ED1C24] w-[154px] text-xl text-center text-white font-bold `}
          onClick={() => {
            editMode ? handleSave() : setEditMode(true);
          }}
        >
          {editMode ? "Save Post" : "Edit Post"}
        </button>
        {/* TODO: UPLOAD IMAGE */}
        </div>
      )}
      {richTextContent && (
        <div
          className={"mt-5 mb-20 " + editMode ? "" : ""}
          onDoubleClick={() => editable && setEditMode(true)}
        >
          <div className="flex mt-5 mb-10">
            {editMode && (
              <div className="flex items-center border-r-2 mr-2">
                <p className="text-lg mr-2 text-gray-500 ">Body</p>
              </div>
            )}
            <div className="flex-1">
              {
                editMode ? 
              <Editor
                apiKey="m3k4ttny70qcb0w63mv6hqr47xwiyl9gxyzq1qr4rrv6bsbd"
                init={{
                  plugins:
                    "",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                }}
                value={richTextContent}
                onEditorChange={(content) => {
                  checkAndSetRichTextContent(content)
                  setBody(htmlToPlainText(content))
                }}
              />
              :
              <div dangerouslySetInnerHTML={{__html: richTextContent}} />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Post({ params }: { params: { id: string } }) {
  const [uid, setUid] = useState<string>("");

  return (
    <PageShell uid={uid} setUid={(uid) => setUid(uid)}>
      {<PostAuthed uid={uid} pid={params.id} />}
    </PageShell>
  );
}
