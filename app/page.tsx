import Image from 'next/image'
// import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div>
      <div className="sticky top-0">
        {/* <Navbar /> */}
      </div>
      <div className="flex flex-row h-[800px]">
        <div className="flex-auto w-8/12 bg-red-100">
          <div className='px-[70px] my-[300px] space-y-3'>
            <h1 className="lg:text-6xl text-4xl font-bold">Welcome to</h1>
            <div className="lg:text-5xl pl-1 text-2xl">Conversational AI Lab at Brown</div>
          </div>
        </div>
        <div className="flex-auto w-4/12 bg-blue-100">Hello</div>
      </div>
      <div className="flex flex-row h-[800px]">
        <div className="flex-auto w-8/12 bg-green-100">
          <div className='px-[70px] my-[250px] space-y-4'>
            <h1 className="lg:text-6xl text-4xl font-bold">About</h1>
            <div className="w-3/4 lg:text-2xl pl-1 text-lg">Conversational AI based on large language models (LLMs), such as ChatGPT, has ignited widespread interest. The combination of LLMs with such utilities as LlamaIndex and LangChain has made it possible to create conversational interfaces to document sets, datasets, and structured data repositories. We aim to study and research in these areas.</div>
            <div className="w-full lg: font-bold text-xl pl-1 tex-lg">Learn More</div>
          </div>
        </div>
        <div className="flex-auto w-4/12 bg-yellow-100">Hello</div>
      </div>
    </div>
  )
}
