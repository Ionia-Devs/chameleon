"use client"

import { PlusCircle } from "lucide-react"
interface AddButtonFunction {
  (whereToAdd: string, name: string): Promise<void>
}

interface AddButtonProps {
  addSkill: AddButtonFunction
  whereToAdd: string
}

export default function AddButton({ addSkill, whereToAdd }: AddButtonProps) {
  const handleAdd = async () => {
    await addSkill(whereToAdd, "pee")
  }
  return <button onClick={handleAdd}><PlusCircle /></button>
}
