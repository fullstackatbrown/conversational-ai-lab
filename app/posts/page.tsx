"use client";
import { useState, useEffect, Fragment } from "react";
import { UserData, dummyUserData, Post } from "@/components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";
import { createBlog, getNPosts } from "@/components/util/postFunctions";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";

export default function BlogsPage() {
  const [uid, setUid] = useState<string>("");
  return (
    <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
      <Blogs uid={uid} />
    </PageShell>
  );
}

const Blogs = (props: { uid: string }) => {
  const [uid, setUid] = useState<string>("");
  const [userData, setUserData] = useState<UserData>(dummyUserData);
  const [lastSnapShot, setLastDocumentSnapShot] =
    useState<QueryDocumentSnapshot | null>(null);
  const [currentPosts, setCurrentPosts] = useState<DocumentData[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [postsLoading, setPostsLoading] = useState<boolean>(true);
  const [createPostDialogOpen, setCreatePostDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setUid(props.uid);
  }, [props.uid]);

  useEffect(() => {
    if (uid) {
      getUserData(props.uid).then((userData: UserData) => {
        setUserData(userData);
      });
    }
  }, [uid]);

  useEffect(() => {
    setPostsLoading(true)
    getNPosts(5, null).then((posts) => {
      setPostsLoading(false)
      if (lastSnapShot) {
        setIsMore(false)
      }
      if (posts) {
        setCurrentPosts(posts.documents);
        setPostCount(posts.queriesCount);
        if (posts.lastDocumentSnapShot) {
          setLastDocumentSnapShot(posts.lastDocumentSnapShot);
        }
      }
    });
  }, []);

  const handleCreate = async () => {
    setIsCreatingPost(true)
    let postID = await createBlog(userData.uid);
    router.push(`/posts/${postID}`);
  };

  const handleLoadMore = async () => {
    getNPosts(5, lastSnapShot).then((posts) => {
      if (lastSnapShot === null) {
        setIsMore(false);
      } else if (posts) {
        for (const data of posts.documents) {
          currentPosts.push(data);
        }
        setCurrentPosts(currentPosts);
        setPostCount(postCount - 5);
        setLastDocumentSnapShot(posts.lastDocumentSnapShot);
        console.log("last snapshot", lastSnapShot);
        // run it again to see if we're at the end
        getNPosts(5, lastSnapShot).then((posts) => {
          if (posts) {
            if (posts.lastDocumentSnapShot === null) {
              setIsMore(false);
            }
          }
        });
      }
    });
  };

  return (
    <div>
      <Transition
        as={Fragment}
        show={createPostDialogOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog as="div" className="relative z-10" onClose={() => setCreatePostDialogOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white opacity-80 backdrop-blur-sm" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="overflow-hidden mx-auto my-auto w-full max-w-[426px] fixed inset-0 h-[205px] border border-[#6A6A6A] transition-all transform bg-white z-50">
              <Dialog.Title className="text-[14px] text-center font-[700] mt-6 pt-4 mb-4 px-2">New Blog Post</Dialog.Title>
              <div className="px-2 text-[14px] text-center">
                <div className="flex justify-between gap-4 mx-4 mt-10">
                  <button
                    className="w-[179px] py-2 font-normal text-white text-center bg-[#242424] border border-[#808080]"
                    onClick={() => setCreatePostDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-[179px] py-2 font-normal text-white text-center bg-[#F24B4B]"
                    onClick={() => setCreatePostDialogOpen(true)}
                  >Create </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      <div className="bg-[#AE2C27] flex flex-col items-center justify-center w-full h-[150px] lg:h-[200px]">
        <div className="text-left w-full px-10 lg:px-[150px]">
          <h1 className="lg:text-6xl text-4xl text-white">Blog</h1>
        </div>
      </div>
      {
        uid && userData.role != 'reader' ? (
          <div className="flex justify-center lg:justify-end w-full text-right lg:pr-[100px] mt-10">
            <button
              className="text-white transition-all duration-500 font-bold px-3 py-1 bg-[#AE2C27]"
              onClick={handleCreate}
            >
              <div className="flex flex-row lg:gap-2 items-center justify-center">
                {isCreatingPost ? "Creating ..." : "Create Post"}
                <img src="/assets/add-post.svg" />
              </div>
            </button>
          </div>
        ) : null
      }

      <hr className="h-px mx-10 mt-3 bg-gray-300 border-0" />
      {
        !postsLoading ?
          currentPosts.map((el, i) => {
            return (
              <div key={i}>
                <BlogComponent blog={el} />
                <hr className="h-px mx-10 my-5 bg-gray-300 border-0" />
              </div>
            );
          })
          :
          <div className="text-center py-5 text-2xl ">loading posts...</div>
      }
      <div className="flex flex-col items-center justify-center w-full">
        {isMore ? (
          !postsLoading &&
          <button
            id="btn"
            className="relative inline-flex items-center justify-center py-0.5 px-10 my-2 mr-2 overflow-hidden text-sm font-bold text-gray-600 rounded-lg bg-gray-200"
          >
            <span className="relative px-5 py-2.5" onClick={handleLoadMore}>
              Load More
            </span>
          </button>
        ) : (
          <p className="mb-2">You have reached the end!</p>
        )}
      </div>
    </div >
  );
};
interface BlogComponentProps {
  blog: DocumentData;
}

const BlogComponent = ({ blog }: BlogComponentProps) => {
  const [blogSummary, setBlogSummary] = useState<string>("");
  const [titleSummary, setTitleSummary] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  getUserData(blog.uid).then((userData) => {
    setUserName(userData.userName);
    setUserId(userData.uid);
  });

  useEffect(() => {
    setBlogSummary(
      blog.textContent.length > 300
        ? blog.textContent.slice(0, 300) + "..."
        : blog.textContent
    );
  }, [blog.textContent]);

  useEffect(() => {
    setTitleSummary(blog.title.length > 27 ? blog.title.slice(0, 27) + "..." : blog.title);
  }, [blog.textContent])

  const router = useRouter();
  return (
    <div className="mt-5 mx-10 p-10 md:flex gap-10 hover:bg-gray-100"
      onClick={() => {
        router.push(`/posts/${blog.id}`)
      }}
    >
      <div className="flex-1 h-full ">
        <h1 className="mb-2 font-semibold lg:text-4xl text-3xl text-left">
          {titleSummary}
        </h1>
        <p className="text-lg mb-1">
          By
          <span
            className="font-bold cursor-pointer"
            onClick={() => router.push(`/user/${userId}`)}
          >
            {" " + userName + " "}
          </span>
          <span> | </span>
          <span>{blog.created}</span>
        </p>
        <p className="max-w-prose overflow-y-auto break-words">{blogSummary}</p>
      </div>
      <div className="flex justify-center items-center flex-1">
        <img
          src="https://picsum.photos/500/500"
          className="mt-2 object-cover w-0 h-0 md:h-[200px] md:w-[500px]"
        />
      </div>
    </div>
  );
}


