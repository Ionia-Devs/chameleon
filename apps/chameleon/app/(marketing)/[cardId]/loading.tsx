import { IdCardIcon } from "@radix-ui/react-icons"

import { Skeleton } from "@/components/ui/skeleton"
import { PostItem } from "@/components/post-item"

export default function BusinessCardLoading() {
  return (
    <div className="divide-border-200 w-full max-w-lg divide-y rounded-md border">
      <div className="flex flex-col items-center whitespace-nowrap pb-3">
        <IdCardIcon className="h-20 w-20" />
        <Skeleton className="h-5 w-2/5" />
      </div>
      <PostItem.Skeleton />
      <PostItem.Skeleton />
      <PostItem.Skeleton />
      <PostItem.Skeleton />
      <PostItem.Skeleton />
    </div>
  )
}
