import { edge } from "@/lib/edge"

import { CommandDemo } from "./_components/command-combo-box"

export default async function IndexPage() {
  const cards = await edge.businessCard.findMany({
    cacheStrategy: { ttl: 60 * 60 * 24 * 7 }, // 1 week
  })

  return (
    <>
      <section className="py-8 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex h-[50vh] max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="h-1/3 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Auto ID Directory.
          </h1>
          {/* <div className="mt-10 flex w-full max-w-lg items-center rounded-full bg-secondary ">
            <MagnifyingGlassIcon className="mr-4 h-10 w-10 text-gray-500" />
            <Input
              className="w-full border-none focus-visible:ring-0"
              type="search"
            />
          </div> */}
          <div className="w-full gap-4 md:w-1/2">
            <CommandDemo cards={cards} />
          </div>
        </div>
      </section>
    </>
  )
}
