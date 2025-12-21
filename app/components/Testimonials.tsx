import { Quote, Star, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Testimonials = () => {
    const stats = [
    { value: "4.9", label: "Average Rating" },
    { value: "2,400+", label: "Stays Completed" },
    { value: "98%", label: "Return Rate" }
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Travel Blogger",
      image: "",
      rating: 5,
      text: "The most peaceful week of my life. Waking up to mountain views and birdsong was pure magic."
    },
    {
      id: 2,
      name: "David Chen",
      role: "Architect",
      image: "",
      rating: 5,
      text: "Stunning design meets authentic wilderness. Every detail was thoughtfully curated."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Photographer",
      image: "",
      rating: 5,
      text: "I've traveled the world, but this place has my heart. The hospitality is unmatched."
    }
]

  return (
    <section className='w-full py-24 px-6 md:px-20 bg-neutral-900 text-white'>
        {/* Header with Stats */}
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8'>
            <div>
                <span className='text-amber-400 font-medium tracking-wider text-sm uppercase'>Guest Stories</span>
                <h2 className='text-4xl md:text-5xl font-bold mt-3 leading-tight'>Loved By <br/> Thousands</h2>
            </div>

            {/* Stats Row */}
            <div className='flex gap-12'>
                {stats.map((stat, index) => (
                    <div key={index} className='text-center'>
                        <div className='flex items-center gap-1 justify-center'>
                            <p className='text-3xl md:text-4xl font-bold text-amber-400'>{stat.value}</p>
                            {index === 0 && <Star size={20} className='fill-amber-400 text-amber-400'/>}
                        </div>
                        <p className='text-xs text-gray-400 mt-1 uppercase tracking-wide'>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Testimonial Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {reviews.map((review) => (
                <div key={review.id} className='bg-neutral-800 p-8 rounded-[30px] border border-neutral-700 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between'>

                    {/* Quote Icon */}
                    <div>
                        <Quote size={32} className='text-amber-400 mb-4'/>

                        {/* Rating Stars */}
                        <div className='flex gap-1 mb-4'>
                            {[...Array(review.rating)].map((_,i) =>(
                                <Star key={i} size={16} className='fill-amber-400 text-amber-400'/>
                            ))}
                        </div>
                        
                        {/* Review Text */}
                        <p className='text-gray-300 leading-relaxed text-sm mb-6 tracking-wider'>{review.text}</p>
                    </div>

                    {/* Guest Info */}
                    <div className='flex items-center gap-4 mt-auto'>
                        <div className='relative w-12 h-12 rounded-full border overflow-hidden flex items-center justify-center'>
                            <User size={24} className=''/>
                        </div>
                        <div>
                            <p className='font-semibold text-white'>{review.name}</p>
                            <p className='text-xs text-gray-400'>{review.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* CTA */}
        <div className='mt-16 text-center'>
            <p className='text-gray-400 mb-4'>Join hundreds of happy travelers</p>
            <button className='bg-amber-400 hover:bg-amber-500 text-black font-semibold px-8 py-4 rounded-full translation-all inline-flex items-center gap-2 tracking-tight'>Book Your Escape Now</button>
        </div>
    </section>
  )
}

export default Testimonials
