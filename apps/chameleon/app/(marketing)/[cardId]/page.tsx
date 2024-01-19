import Link from "next/link"
import { notFound } from "next/navigation"
import { IdCardIcon } from "@radix-ui/react-icons"

import { edge } from "@/lib/edge"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CopyToClipboardButton from "@/components/copy-to-clipboard-button"
import { Icons } from "@/components/icons"

async function getBusinessCard(cardId: string) {
  return await edge.businessCard.findFirst({
    where: {
      id: cardId,
    },
    cacheStrategy: { ttl: 60 * 60 * 24 * 7 }, // 1 week
  })
}

interface BusinessCardPageProps {
  params: { cardId: string }
}

export default async function BusinessCardPage({
  params,
}: BusinessCardPageProps) {
  const card = await getBusinessCard(params.cardId)

  if (!card) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-col items-center whitespace-nowrap">
        <IdCardIcon className="h-20 w-20" />
        <h1 className="text-4xl font-bold">{card.name}</h1>
      </div>
      <Card className="w-full max-w-4xl">
        <CardContent className="divide-y">
          {card.autoId && (
            <div className="flex flex-row items-center justify-between py-4">
              <h2 className="font-bold">Auto ID #:</h2>
              <div className="flex items-center">
                <p className="text-gray-500">{card.autoId}</p>
                <CopyToClipboardButton text={card.autoId} />
              </div>
            </div>
          )}
          {card.name && (
            <div className="flex flex-row items-center justify-between py-4">
              <h2 className="font-bold">Name:</h2>
              <div className="flex items-center">
                <p className="text-gray-500">{card.name}</p>
                <CopyToClipboardButton text={card.name} />
              </div>
            </div>
          )}
          {card.directPhone && (
            <div className="flex flex-row items-center justify-between py-4">
              <h2 className="font-bold">Direct Phone:</h2>
              <div className="flex items-center">
                <p className="text-gray-500">{card.directPhone}</p>
                <CopyToClipboardButton text={card.directPhone} />
              </div>
            </div>
          )}
          {card.email && (
            <div className="flex flex-row items-center justify-between py-4">
              <h2 className="font-bold">Email:</h2>
              <div className="flex items-center">
                <p className="text-gray-500">{card.email}</p>
                <CopyToClipboardButton text={card.email} />
              </div>
            </div>
          )}
          {card.mainPhone && (
            <div className="flex flex-row items-center justify-between py-4">
              <h2 className="font-bold">Main Phone:</h2>
              <div className="flex items-center">
                <p className="text-gray-500">{card.mainPhone}</p>
                <CopyToClipboardButton text={card.mainPhone} />
              </div>
            </div>
          )}
          {card.mainFax && (
            <div className="flex flex-row items-center justify-between py-4">
              <h2 className="font-bold">Main Fax:</h2>
              <div className="flex items-center">
                <p className="text-gray-500">{card.mainFax}</p>
                <CopyToClipboardButton text={card.mainFax} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Go Back
        </>
      </Link>
    </>
  )
}
