import Image from 'next/image'
import Navbar from "../components/Navbar"
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="flex flex-col lg:h-[200vh] h-[200vh]">
      <div className="sticky top-0 w-full">
        <Navbar />
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex-auto flex items-center w-8/12 ">
          <div className='px-[70px] mb-[100px] space-y-3'>
            <h1 className="lg:text-6xl text-4xl font-bold">Welcome to</h1>
            <div className="lg:text-5xl pl-1 text-2xl">Conversational AI Lab at Brown</div>
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
  )
}
