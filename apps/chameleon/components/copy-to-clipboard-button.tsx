"use client"

import { CopyIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "./ui/button"

const CopyToClipboardButton = ({ text }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast(`Copied ${text} to clipboard!`)
    } catch (err) {
      toast("Failed to copy!")
    }
  }

  return (
    <Button onClick={copyToClipboard} className="ml-4 rounded px-2 py-1">
      <CopyIcon className="h-4 w-4" />
    </Button>
  )
}

export default CopyToClipboardButton
