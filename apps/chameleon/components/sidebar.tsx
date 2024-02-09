'use client'

import Link from 'next/link'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Message } from '@/app/(showcase)/showcase/chat/data'

interface SidebarProps {
  isCollapsed: boolean
  links: {
    name: string
    messages: Message[]
    avatar: string
    variant: 'grey' | 'ghost'
  }[]
  onClick?: () => void
  isMobile: boolean
}

export function Sidebar({ links, isCollapsed, isMobile }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 dark:text-neutral-100 text-neutral-900"
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-neutral-600 dark:text-neutral-300">
              ({links.length})
            </span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9 hover:bg-neutral-300 dark:hover:bg-neutral-700'
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9 hover:bg-neutral-300 dark:hover:bg-neutral-700'
              )}
            >
              <Pencil2Icon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: 'icon' }),
                      'h-11 w-11 md:h-16 md:w-16 hover:bg-neutral-300 dark:hover:bg-neutral-700',
                      link.variant === 'grey' &&
                        'hover:bg-neutral-300 dark:hover:text-white'
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={link.avatar}
                        alt={link.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10 rounded-full border-2 border-black"
                      />
                    </Avatar>
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 dark:bg-neutral-100 dark:text-neutral-900 text-neutral-100 bg-neutral-900"
                >
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: 'xl' }),
                link.variant === 'grey' &&
                  'dark:bg-neutral-700 dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                'justify-start gap-4 dark:hover:bg-neutral-700 hover:bg-neutral-300'
              )}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={link.avatar}
                  alt={link.avatar}
                  width={6}
                  height={6}
                  className="min-w-10 min-h-10 rounded-full dark:border-neutral-100 border-2 border-black"
                />
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span className="truncate w-full">{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="text-neutral-400 text-xs truncate">
                    {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
