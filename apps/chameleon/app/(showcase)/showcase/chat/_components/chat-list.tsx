import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Message, UserData } from '@/app/(showcase)/showcase/chat/data'

import ChatBottombar from './chat-bottombar'

interface ChatListProps {
  messages?: Message[]
  selectedUser: UserData
  sendMessage: (newMessage: Message) => void
  isMobile: boolean
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col scrollbar-thin scrollbar-track-rounded-lg scrollbar-thumb-rounded scrollbar-thumb-neutral-900 dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-100 scrollbar-track-neutral-300"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 p-4 whitespace-pre-wrap',
                message.name !== selectedUser.name ? 'items-end' : 'items-start'
              )}
            >
              <div className="flex gap-3 items-center">
                {message.name === selectedUser.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                {message.name === selectedUser.name && (
                  <span className="bg-lime-300 p-3 text-black rounded-md max-w-xs">
                    {message.message}
                  </span>
                )}
                {message.name !== selectedUser.name && (
                  <span className="bg-blue-300 p-3 text-black rounded-md max-w-xs">
                    {message.message}
                  </span>
                )}
                {message.name !== selectedUser.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  )
}
