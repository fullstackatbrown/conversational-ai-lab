'use client'
import Image from 'next/image'
import Navbar from "../components/Navbar"
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { firebaseApp } from '@/firebaseClient';
import { createUserDBEntry } from '@/components/util/userDBFunctions';
import { useRouter } from 'next/navigation'
import PageShell from '@/components/PageShell'

export default function HomePage() {
  const [uid, setUid] = useState<string>("");
  return (
    <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
      <Home />
    </PageShell>
  )
}

function Home() {
  const subText = ["Conversational ", "AI ", "Lab ", "at ", "Brown "]
  const [subTextIndex, setSubTextIndex] = useState<number>(0);
  const [titleSubText, setTitleSubtext] = useState<String>("");
  const [isBlinking, setIsBlinking] = useState<String>("");

  const router = useRouter();

  useEffect(() => {
    if (subTextIndex < subText.length) {
      let delay = subTextIndex == 0 ? 500 : 200
      setIsBlinking(_ => "");
      const timeout = setTimeout(() => {
        setTitleSubtext(prevText => prevText + subText[subTextIndex]);
        setSubTextIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setIsBlinking(_ => "animate-pulse");
      const timeout = setTimeout(() => {
        setTitleSubtext("");
        setSubTextIndex(0);
      }, 3000);
    }
  }, [subTextIndex, subText]);

  return (
    <div className="flex flex-col h-[120vh] md:h-[180vh]">
      <div className="flex flex-row flex-1">
        <div className="flex-auto flex items-center w-8/12">
          <div className='px-[50px] md:px-[70px] mb-[0px] sm:mb-[30px] md:mb-[100px] space-y-3'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Welcome to</h1>
            <div className="w-full h-40 lg:h-50 flex flex-col items-start gap-2">
              <div className="text-[#D292FF] text-xl md:text-4xl lg:text-5xl pl-1 font-semibold">
                {titleSubText}
                <div className={`inline-block w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 rounded-full bg-[#D292FF] min-h-1 ${isBlinking}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block flex-auto w-4/12 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex-auto flex items-center w-8/12">
          <div className='px-[50px] md:px-[70px] space-y-3'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">About</h1>
            <div className="w-3/4 sm:w-full text-lg md:text-2xl lg:text-3xl">Welcome to the Conversational AI Lab. Our goal in creating the Lab and this website is to launch a forum where students, faculty, and staff at Brown University (and someday maybe beyond) can share their work and discoveries in Conversational AI.</div>
            <div className="group flex w-auto lg:w-1/3 gap-1 items-center cursor-pointer">
              <p
                className="w-auto text-lg lg:text-xl font-bold group-hover:text-red-500 group-hover:underline underline-offset-4"
                onClick={() => { router.push("/about") }}
              >
                Learn More
              </p>
              <span className="transition ease-in-out delay-50 mt-1 collapse group-hover:visible group-hover:translate-x-2">
                <ArrowLongRightIcon className="block h-9 text-red-500" />
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block flex-auto w-4/12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>
    </div >
  );
}
