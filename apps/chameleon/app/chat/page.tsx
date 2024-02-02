import { cookies } from 'next/headers'

import { ChatLayout } from '@/components/chat-layout'

export default function Home() {
  const layout = cookies().get('react-resizable-panels:layout')
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-bl from-[#fe7489] from-15% via-[#eb8af9] via-55% to-[#08d3f9] to-80% bg-[length:250%_250%] p-4 md:px-24 py-32 gap-4">
      <div className="flex justify-between max-w-5xl w-full items-center">
        <h1 className="text-4xl font-bold">Chat</h1>
      </div>

      <div className="z-10 border p-1 border-neutral-900 bg-neutral-100 dark:bg-neutral-900 rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  )
}
