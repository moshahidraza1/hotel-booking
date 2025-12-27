import { ArrowUpRight, Users, Wifi } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedStays = () => {
    const rooms = [
    {
      id: 1,
      name: 'The Alpine Loft',
      price: '$240',
      image: 'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1764056713/interior-services_ydajle.jpg', 
      capacity: '2 Guests',
      tag: 'Best Seller',
      slug: 'alpine-loft'
    },
    {
      id: 2,
      name: 'Forest Glass Cabin',
      price: '$350',
      image: 'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1764056590/woodwork-services_wqnbbu.jpg',
      capacity: '4 Guests',
      tag: 'Trending',
      slug: 'forest-glass-cabin'
    },
    {
      id: 3,
      name: 'Lakeside Retreat',
      price: '$420',
      image: 'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1764055542/samples/landscapes/nature-mountains.jpg',
      capacity: '6 Guests',
      tag: 'New',
      slug: 'lakeside-retreat'
    }
]
  return (
    <section id={'rooms'} className='w-full py-24 px-6 md:px-20 bg-[#FDFCF8]'>

        <div className='flex flex-col justify-between mt-12 '>
            <div>
                <span className='text-amber-600 font-medium tracking-wider text-sm uppercase'>Our Collection</span>
                <h2 className='text-4xl md:text-5xl font-bold text-black mt-3'>Curated Stays <br/> For Every Explorer</h2>
                <button className='hidden md:flex items-center gap-2 text-black border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all'>View All Cabins <ArrowUpRight size={18}/></button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20'>
                {rooms.map((room) => (
                    <Link key={room.id} href={`/rooms/${room.slug}`} className='group cursor-pointer'>
                        <div className='relative h-100 w-full overflow-hidden rounded-[30px] mb-4'>
                            <Image src={room.image} alt={room.name} fill className='object-cover transition-transform duration-700 group-hover:scale-110'/>
                            <div className='absolute top-4 left-4 bg-white/90 backdrop:-blur-sm px-3 py-1 rounded-full text-black text-xs font-semibold uppercase tracking-wide'>
                                {room.tag}
                            </div>
                        </div>
                        <div className='flex justify-between items-start px-2'>
                            <div>
                                <h3 className='text-xl font-bold text-black group-hover:text-amber-700 transition-colors'>{room.name}</h3>
                                <div className='flex items-center gap-4 mt-2 text-gray-500 text-sm'>
                                    <span className='flex items-center gap-1'>
                                        <Users size={14}/> {room.capacity}
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <Wifi size={14}/> Fast Wifi 
                                    </span>
                                </div>
                            </div>
                            <div className='text-right whitespace-nowrap'>
                                <p className='text-lg font-bold text-black'>{room.price} <span className='text-xs font-normal text-gray-400'>/ night</span></p>
                            </div>
                        </div>

                    </Link>
                ))}

            </div>

            <button className='md:hidden mt-10 w-full flex items-center justify-center gap-2 text-black border border-black py-3 rounded-full hover:bg-black hover:text-white transition-all'>View All Cabins <ArrowUpRight size={18}/></button>
        </div>
    </section>
  )
}

export default FeaturedStays
