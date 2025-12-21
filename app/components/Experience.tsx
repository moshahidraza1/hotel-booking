import { Compass, Moon, Utensils, Wind } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Experience = () => {

    const features = [
    {
      icon: <Compass size={24} />,
      title: "Guided Wilderness",
      desc: "Expert-led treks through hidden trails and untouched valleys."
    },
    {
      icon: <Utensils size={24} />,
      title: "Organic Dining",
      desc: "Farm-to-table meals prepared with ingredients from our own garden."
    },
    {
      icon: <Moon size={24} />,
      title: "Stargazing Decks",
      desc: "Zero light pollution ensures the most spectacular night skies."
    },
    {
      icon: <Wind size={24} />,
      title: "Digital Detox",
      desc: "Disconnect to reconnect. No TVs, just nature's soundtrack."
    }
  ]

  return (
    <section id='experiences' className='w-full py-24 px-6 md:px-20 bg-[#FDFCF8] overflow-hidden'>
        <div className='flex flex-col lg:flex-row items-center gap-16'>
            {/* Left: text content */}
            <div className='w-full lg:w-1/2 space-y-8'>
            <div>
                <span className='text-amber-600 font-medium tracking-wider text-sm uppercase'>The Experience</span>
                <h2 className='tex-4xl md:text-5xl font-bold text-black mt-3 leading-tight'>More Than Just <br/> A Place To Sleep
                </h2>
                <p className='text-gray-500 mt-4 text-lg leading-relaxed max-w-md'>We believe in slow living. Our sanctuary is designed to help you pause, breathe, and find your rhythm with nature again.</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8'>
                {features.map((feature, index) => (
                    <div key={index} className='flex flex-col gap-3'>
                        <div className='w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700'>
                            {feature.icon}
                        </div>
                        <h4 className='text-lg font-bold text-black'>{feature.title}</h4>
                        <p className='text-sm text-gray-500 leading-relaxed'>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Right: Image Composition */}
        <div className='w-full lg:w-1/2 relative h-150'>
            {/* Main Large Image */}
            <div className='absolute top-0 right-0 w-[85%] h-[70%] md:h-[85%]  rounded-[40px] overflow-hidden z-10'>
                <Image src="https://res.cloudinary.com/ddvhuxa9f/image/upload/v1764056713/interior-services_ydajle.jpg" 
                    alt="Cozy Room" 
                    fill 
                    className='object-cover'
                    priority
                    />
            </div>
            {/* Floating overlapping Image */}
            <div className='absolute bottom-0 left-0 w-[70%] md:w-[50%] h-[45%] rounded-[30px] overflow-hidden z-20 border-4 border-[#FDFCF8] shadow-2xl'>
                <Image 
                    src="https://res.cloudinary.com/ddvhuxa9f/image/upload/v1764055542/samples/landscapes/nature-mountains.jpg" 
                    alt="Outdoor View" 
                    fill 
                    className='object-cover'
                />
            </div>

            {/* Decorative Element */}
            <div className='absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full blur-3xl opacity-100 z-0'>     
            </div>
        
        </div>

        </div>
    </section>
    
  )
}

export default Experience
