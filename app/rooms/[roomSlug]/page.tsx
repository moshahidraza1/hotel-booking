'use client'
import { roomsData } from '@/app/utils/roomInfo.utils'
import { ArrowLeft, ChevronLeft, ChevronRight, Home, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const RoomPage = () => {
  const params = useParams()
  const roomSlug = params.roomSlug as string

  const room = roomsData.find(r => r.slug === roomSlug)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if(!room){
    return(
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-black mb-4'>Room Not Found</h1>
          <Link href='/' className='text-amber-600 hover:text-amber-700'>Return To Home Page</Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev+1) % room.images.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev-1 + room.images.length) % room.images.length)
  }

  return (
    <div className='min-h-screen bg-[#FDFCFB]'>
      {/* Header */}
      <div className='px-6 md:px-20 py-8'>
        <Link href='/' className='inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors'>
        <ArrowLeft size={20} />Back to Home</Link>
      </div>

      {/* Hero Image Gallery */}
      <div className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
        <Image src={room.images[currentImageIndex]}
        alt={room.name}
        fill
        priority
        unoptimized={true}
        className='object-cover'
        />
      

      {/* Image Navigation */}
      <button
      onClick={prevImage}
      className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all'>
        <ChevronLeft size={24} className='text-gray-400'/>
      </button>
      <button
      onClick={nextImage}
      className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all'>
        <ChevronRight size={24} className='text-gray-400'/>
      </button>

      {/* Image Indicators */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
      {room.images.map((_, index) => (
        <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></button>
      ))}
      </div>

      {/* Room Tag */}
      <div className='absolute top-4 left-4 bg-amber-400 text-black px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide'>
        {room.tag}
      </div>
    </div>

    {/* Content */}
    <div className='px-6 md:px-20 py-16'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Info */}
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-black mb-4'>{room.name}</h1>
          <p className='text-xl text-gray-600 leading-relaxed max-w-3xl'>{room.description}</p>

          <div className='flex flex-wrap items-center gap-6 mt-6 text-gray-600'>
            <div className='flex items-center gap-2'>
              <MapPin size={18}/>
              <span>{room.location}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Home size={18}/>
              <span>{room.size}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Users size={18}/>
              <span>{room.capacity}</span>
            </div>
          </div>
        </div>

        {/* Highlight */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-black mb-8'>Highlights</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {room.highlights.map((highlight, index) => (
              <div key={index} className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-amber-400 rounded-full shrink-0'></div>
                <span className='text-gray-700'>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ammenities */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-black mb-8'>Ammenities</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {room.amenities.map((category,index) => (
              <div key={index} className='bg-white rounded-2xl p-6 border border-gray-100'>
                <h3 className='font-semibold text-black mb-4'>{category.category}</h3>
                <ul className='space-y-2'>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-gray-600 text-sm flex items-center gap-2'>
                      <div className='w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0'></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className='bg-amber-50 rounded-3xl p-8 md:p-12'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-black mb-2'>Ready to Book?</h2>
            <p className='text-gray-600'>Experience the magic of {room.name}</p>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='text-center md:text-left'>
              <p className='text-3xl font-bold text-black mb-1'>{room.price}</p>
              <p className='text-gray-600'>per night</p>
            </div>

            <div className='flex gap-4'>
              <Link
              href={`/booking?room=${room.slug}`}
              className='bg-black text-white px-4 md:px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors'>
                Book Now
              </Link>
              <Link
              href='/#contact'
              className='border border-black text-black px-4 md:px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors'>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>



    </div>
    
  )
}

export default RoomPage
