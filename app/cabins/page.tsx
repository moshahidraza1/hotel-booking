'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Users, Wifi, MapPin, Home, Star, Filter } from 'lucide-react'
import { roomsData } from '../utils/roomInfo.utils'

const CabinsPage = () => {
  const [filter, setFilter] = useState<'all' | 'best-seller' | 'trending' | 'new'>('all')
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name')

  // filter and sort rooms
  const filteredRooms = roomsData
    .filter(room => {
      if (filter === 'all') return true
      return room.tag.toLowerCase().replace(' ', '-') === filter
    })
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace('$', ''))
      const priceB = parseInt(b.price.replace('$', ''))
      
      switch (sortBy) {
        case 'price-low':
          return priceA - priceB
        case 'price-high':
          return priceB - priceA
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className='min-h-screen bg-[#FDFCF8]'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 md:px-20 py-6'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='flex items-center gap-2 text-gray-600 hover:text-black transition-colors'>
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className='text-center'>
              <h1 className='text-3xl md:text-4xl font-bold text-black'>All Cabins</h1>
              <p className='text-gray-600 mt-2'>Discover your perfect Himalayan retreat</p>
            </div>
            <div className='w-20'></div> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 md:px-20 py-12'>
        
        {/* Filters and Sort */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 text-gray-600'>
          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-amber-400 text-black' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-amber-400'
              }`}
            >
              All Cabins
            </button>
            <button
              onClick={() => setFilter('best-seller')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'best-seller' 
                  ? 'bg-amber-400 text-black' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-amber-400'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'trending' 
                  ? 'bg-amber-400 text-black' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-amber-400'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'new' 
                  ? 'bg-amber-400 text-black' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-amber-400'
              }`}
            >
              New
            </button>
          </div>

          <div className='flex items-center gap-3'>
            <Filter size={18} className='text-gray-500' />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className='px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none'
            >
              <option value='name'>Sort by Name</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-8'>
          <p className='text-gray-600'>
            Showing {filteredRooms.length} cabin{filteredRooms.length !== 1 ? 's' : ''}
            {filter !== 'all' && ` • ${filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
          </p>
        </div>

        {/* Cabins Grid */}
        {filteredRooms.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredRooms.map((room) => (
              <Link 
                key={room.id} 
                href={`/rooms/${room.slug}`}
                className='group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100'
              >
                {/* Image */}
                <div className='relative h-64 overflow-hidden'>
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide'>
                    {room.tag}
                  </div>
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-black'>
                    {room.price}/night
                  </div>
                </div>

                {/* Content */}
                <div className='p-6'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='text-xl font-bold text-black group-hover:text-amber-700 transition-colors mb-1'>
                        {room.name}
                      </h3>
                      <div className='flex items-center gap-1 text-gray-500 text-sm'>
                        <MapPin size={14} />
                        {room.location}
                      </div>
                    </div>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className='text-amber-400 fill-current' />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.9</span>
                    </div>
                  </div>

                  {/* Capacity and Size */}
                  <div className='flex items-center gap-4 mb-4 text-gray-600 text-sm'>
                    <div className='flex items-center gap-1'>
                      <Users size={14} />
                      {room.capacity}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Home size={14} />
                      {room.size}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Wifi size={14} />
                      Fast WiFi
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {room.description}
                  </p>

                  {/* Highlights */}
                  <div className='mb-4'>
                    <h4 className='text-sm font-semibold text-black mb-2'>Highlights</h4>
                    <div className='flex flex-wrap gap-2'>
                      {room.highlights.slice(0, 2).map((highlight, index) => (
                        <span 
                          key={index}
                          className='px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full'
                        >
                          {highlight}
                        </span>
                      ))}
                      {room.highlights.length > 2 && (
                        <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'>
                          +{room.highlights.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold text-black'>{room.price}</span>
                    <span className='text-amber-600 font-medium text-sm group-hover:text-amber-700 transition-colors'>
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Filter size={24} className='text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No cabins found</h3>
            <p className='text-gray-600 mb-6'>Try adjusting your filters to see more options.</p>
            <button
              onClick={() => setFilter('all')}
              className='bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-full transition-colors'
            >
              Show All Cabins
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className='mt-16 bg-amber-50 rounded-3xl p-8 md:p-12 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-black mb-4'>
            Can't Find What You're Looking For?
          </h2>
          <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
            Our team can help you find the perfect cabin for your needs. Contact us for personalized recommendations.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/#contact'
              className='bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors'
            >
              Contact Us
            </Link>
            <Link
              href='/'
              className='border border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CabinsPage