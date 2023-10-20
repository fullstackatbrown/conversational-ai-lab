'use client'
import Image from 'next/image'
import Navbar from "../components/Navbar"
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { firebaseApp } from '@/firebaseClient';
import { createUserDBEntry } from '@/components/util/userDBFunctions';
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");

  const auth = getAuth(firebaseApp)

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUid(user.uid);
      setEmail(user.email);
      setProfileUrl(user.photoURL ? user.photoURL : "");
      if (uid && email) {
        await createUserDBEntry(uid, email, profileUrl);
        console.log("User Signed in ");
      } else {
        console.log("User not signed in");
      }
    }
  }
  );
  return <Home uid={uid} email={email} profileUrl={profileUrl} />
}

function Home(props: { uid: string, email: string | null, profileUrl: string }) {
  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");

  const subText = ["Conversational ", "AI ", "Lab ", "at ", "Brown "]
  const [subTextIndex, setSubTextIndex] = useState<number>(0);
  const [titleSubText, setTitleSubtext] = useState<String>("")

  useEffect(() => {
    setUid(props.uid);
    setEmail(props.email);
    setProfileUrl(props.profileUrl);
  }, [props.uid, props.email, props.profileUrl])

  useEffect(() => {
    if (subTextIndex < subText.length) {
      let delay = subTextIndex == 0 ? 500 : 200
      const timeout = setTimeout(() => {
        setTitleSubtext(prevText => prevText + subText[subTextIndex]);
        setSubTextIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTitleSubtext("");
        setSubTextIndex(0);
      }, 3000);
    }
  }, [subTextIndex, subText]);


  const auth = getAuth(firebaseApp)
  const provider = new GoogleAuthProvider();

  const router = useRouter();


  async function handleSignIn() {
    await signInWithRedirect(auth, provider);
    const result = await getRedirectResult(auth);
  }

  async function handleSignOut() {
    await auth.signOut();
    setUid("");
    setEmail("");
  }

  return (
    <div className="flex flex-col lg:h-[200vh] h-[200vh]">
      <div className="sticky top-0 w-full">
        <Navbar uid={uid} profileUrl={profileUrl} handleSignIn={() => handleSignIn()} handleSignOut={() => handleSignOut()} />
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex-auto flex items-center w-8/12 ">
          <div className='px-[70px] mb-[100px] space-y-3'>
            <h1 className="lg:text-6xl text-4xl font-bold">Welcome to</h1>
            <div className="flex items-center gap-2">
              <div className="text-[#D292FF] lg:text-5xl pl-1 text-2xl font-semibold">{titleSubText}</div>
              <div className="inline-block w-8 h-8 rounded-full bg-[#D292FF] min-h-1" />
            </div>
          </div>
        </div>
        <div className="flex-auto w-4/12 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex-auto flex items-center w-8/12">
          <div className='px-[70px] space-y-3'>
            <h1 className="lg:text-6xl text-4xl font-bold">About</h1>
            <div className="w-3/4 lg:text-2xl text-lg">Conversational AI based on large language models (LLMs), such as ChatGPT, has ignited widespread interest. The combination of LLMs with such utilities as LlamaIndex and LangChain has made it possible to create conversational interfaces to document sets, datasets, and structured data repositories. We aim to study and research in these areas.</div>
            <div className="group flex lg:w-1/3  w-auto gap-1 items-center">
              <p className="w-auto lg:text-xl font-bold text-lg group-hover:text-red-500 group-hover:underline underline-offset-4">Learn More</p>
              <span className="transition ease-in-out delay-50 mt-1 collapse group-hover:visible group-hover:translate-x-2">
                <ArrowLongRightIcon className="block h-9 text-red-500" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex-auto w-4/12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
}
