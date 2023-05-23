import Image from 'next/image';

import Navbar from '../navigation/Navbar';
import Pattern from './Pattern';
import Link from 'next/link';

export default function Example() {

  return (
    <div className="bg-white">
      <Navbar className="absolute inset-x-0 top-0 z-50" />

      <main>
        <div className="relative isolate">
          <Pattern />

          <div className="overflow-hidden">
            <div className="px-6 pb-32 mx-auto max-w-7xl pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="max-w-2xl mx-auto gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Embrace the Heat: Discover Your Strength.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  Welcome to a place where warmth fuels your journey to greater strength. Through our unique hot yoga practices, you will challenge your body, sharpen your mind, and uncover the power within you. Start your transformation today and embrace the rewarding experience of growth.
                  </p>
                  <div className="flex items-center mt-10 gap-x-6">
                    <Link href="new-to-hot-yoga-ghent" className="text-sm font-semibold leading-6 text-gray-900">
                      New to hot yoga Ghent? <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-end gap-8 mt-14 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="flex-none pt-32 ml-auto space-y-8 w-44 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <Image
                        src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684685191/photo6.jpg"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        alt="Hot Yoga Ghent Logo"
                      />
                      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="flex-none mr-auto space-y-8 w-44 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684684971/photo2.jpg"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        alt="Hot Yoga Ghent Logo"
                      />
                      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684683862/photo1.jpg"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        alt="Hot Yoga Ghent Logo"
                      />
                      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="flex-none pt-32 space-y-8 w-44 sm:pt-0">
                    <div className="relative">
                      <Image
                        src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684684952/photo5.jpg"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        alt="Hot Yoga Ghent Logo"
                      />
                      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src="https://res.cloudinary.com/dmvwqhup8/image/upload/v1684684953/photo4.jpg"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        alt="Hot Yoga Ghent Logo"
                      />
                      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}