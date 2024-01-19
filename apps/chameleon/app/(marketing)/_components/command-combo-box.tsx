"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BusinessCard } from "@prisma/client"

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandDemo({ cards }: { cards: BusinessCard[] }) {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const handleSelect = (cardId: string) => {
    router.push(`/${cardId}`)
  }

  return (
    <Command className="rounded-lg border px-6 py-3 shadow-md">
      <CommandInput
        placeholder="Search business cards..."
        value={inputValue}
        onValueChange={(value) => setInputValue(value)}
      />
      <CommandList>
        {inputValue && (
          <div className="animate-in fade-in-50">
            <CommandGroup heading="Suggestions">
              {cards.map((card) => (
                <CommandItem
                  key={card.id}
                  onSelect={() => handleSelect(card.id)}
                >
                  <span>{card.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </CommandList>
    </Command>
  )
}
