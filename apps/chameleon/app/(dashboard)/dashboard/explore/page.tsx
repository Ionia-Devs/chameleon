import { Suspense } from 'react'

import { LayoutGrid } from '@/components/ui/layout-grid'

const Skeleton = (props: { title: string; content: string }) => {
  const { title, content } = props
  return (
    <div className="h-2/3">
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {content}
      </p>
    </div>
  )
}

export default async function LayoutGridDemo() {
  const cards = [
    {
      id: 1,
      content: <Skeleton title={'Other City'} content={'BIG POG'} />,
      className: 'md:col-span-2',
      thumbnail: 'https://source.unsplash.com/random/?city,night',
    },
    {
      id: 2,
      content: <Skeleton title={'Other City'} content={'ALSO POG'} />,
      className: 'col-span-1',
      thumbnail: 'https://source.unsplash.com/random/?city,day',
    },
    {
      id: 3,
      content: (
        <Skeleton
          title={'I queried for pizza with this on unsplash...'}
          content={'Does this look like pizza to you?'}
        />
      ),
      className: 'col-span-1',
      thumbnail: 'https://source.unsplash.com/random/?pizza,night',
    },
    {
      id: 4,
      content: (
        <Skeleton
          title={'You would never guess what I queried for with this image'}
          content={'It was a green car'}
        />
      ),
      className: 'md:col-span-2',
      thumbnail: 'https://source.unsplash.com/random/?car,green',
    },
    {
      id: 5,
      content: (
        <Skeleton
          title={'something something funny joke'}
          content={'DOPA DOWN'}
        />
      ),
      className: 'col-span-1',
      thumbnail: 'https://source.unsplash.com/random/?trees,clean',
    },
    {
      id: 6,
      content: <Skeleton title={'angy'} content={'>:('} />,
      className: 'col-span-1',
      thumbnail: 'https://source.unsplash.com/random/?star,killer',
    },
    {
      id: 7,
      content: <Skeleton title={'OwO'} content={'UwU'} />,
      className: 'col-span-1',
      thumbnail: 'https://source.unsplash.com/random/?tables,stinky',
    },
  ]

  return (
    <div className="h-screen py-20 w-full">
      <Suspense fallback={<p>Loading...</p>}>
        <LayoutGrid cards={cards} />
      </Suspense>
    </div>
  )
}
