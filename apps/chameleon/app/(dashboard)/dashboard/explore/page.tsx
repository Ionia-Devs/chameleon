import { Suspense } from 'react'
import { LayoutGrid } from '@/components/ui/layout-grid'

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">This is a city</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        BIG POG
      </p>
    </div>
  );
};
 
const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Other City</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Also Pog
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">I queried for pizza with this on unsplash...</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Dose this image look like pizza to you?
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">You&apos;d never guess what I queried for with this image</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        It was a green car
      </p>
    </div>
  );
};

export default async function LayoutGridDemo() {

  const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: 'md:col-span-2',
      thumbnail:
        'https://source.unsplash.com/random/?city,night',
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: 'col-span-1',
      thumbnail:
        'https://source.unsplash.com/random/?city,day',
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: 'col-span-1',
      thumbnail:
        'https://source.unsplash.com/random/?pizza,night',
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: 'md:col-span-2',
      thumbnail:
        'https://source.unsplash.com/random/?car,green',
    },
    {
      id: 5,
      content: <SkeletonFour />,
      className: 'col-span-1',
      thumbnail:
        'https://source.unsplash.com/random/?trees,clean',
    },
    {
      id: 6,
      content: <SkeletonFour />,
      className: 'col-span-1',
      thumbnail:
        'https://source.unsplash.com/random/?star,killer',
    },
    {
      id: 7,
      content: <SkeletonFour />,
      className: 'col-span-1',
      thumbnail:
        'https://source.unsplash.com/random/?tables,stinky',
    },
    {
      id: 8,
      content: <SkeletonFour />,
      className: 'col-span-1',
      thumbnail:
        'https://source.unsplash.com/random/?games,boring',
    },
    {
      id: 9,
      content: <SkeletonFour />,
      className: 'md:col-span-2',
      thumbnail:
        'https://source.unsplash.com/random/?cardio',
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
