import Image from 'next/image'
import React from 'react'
import { Home, Calendar, Users, ChevronDown } from 'lucide-react'
import NavBar from './NavBar'


const Header = () => {
    const bookingParameters = [
        {
            id: 1,
            icon: <Home size={18} />,
            title: 'Room',
            value: 'Tree House',
            hasDropdown: true
        },
        {
            id: 2,
            icon: <Calendar size={18} />,
            title: 'Check-in',
            value: '15 Dec 2025',
            hasDropdown: true
        },
        {
            id: 3,
            icon: <Calendar size={18} />,
            title: 'Check-out',
            value: '20 Dec 2025',
            hasDropdown: true
        },
        {
            id: 4,
            icon: <Users size={18} />,
            title: 'Guests',
            value: '2 Adults',
            hasDropdown: true
        }
    ]
  return (
    <div className='bg-[#FDFCF8] flex flex-col items-center'>
    <div className='relative w-screen h-screen '>
        <Image src={'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1765779626/Hero1_vtf6aq.jpg'} alt='Hero background' fill className='object-cover' priority/>
        <div className='absolute inset-5 md:inset-10 lg:inset-20 border-4 rounded-[30px] border-white/80 z-20'>
        <NavBar/>
        <div className='flex flex-col text-left lg:items-center justify-center lg:text-center space-y-4 p-5 bg-linear-to-t from-black/5 via-black/5 to-transparent'>
        <h1 className='text-3xl md:text-5xl font-bold text-black tracking-tight '>Find Your <br/>
        <span className='text-[#f6f9fa] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>Wild Escape in Himalyas</span>
        </h1>
        <p className="text-neutral-100 sm:max-w-lg lg:max-w-2xl text-sm md:text-base font-medium mt-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Experience the perfect blend of luxury and wilderness in our exclusive Himalayan sanctuary. A private retreat crafted for your ultimate escape.
            </p>
        </div>
        <div className='hidden lg:flex absolute bottom-0 h-18 w-[90%] max-w-4xl left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-50 items-center justify-between shadow-lg px-8 text-neutral-500'>
        {bookingParameters.map((item, index)=>(
            <div key={item.id} className={`flex items-center gap-3 ${index!== bookingParameters.length-1 ? 'border-r border-gray-200 pr-2 pl-2':''}`}>
            <div className='text-gray-500 bg-black/5 p-2 rounded-full'>{item.icon}</div>
            {/* <Icon/> */}
            <div className='flex flex-col'>
                <span className='text-xs font-bold text-black'>{item.title}</span>
                <span className='text-sm text-gray-500 font-medium'>{item.value}</span>
            </div>
           {item.hasDropdown && <ChevronDown size={14} className='text-gray-400 ml-2'/>}
            
        </div>))}
        
        <button className='bg-[#9aacbb] hover:bg-neutral-300 rounded-full px-4 py-3 font-semibold text-sm text-black whitespace-nowrap tracking-tighter'>Book Your Stay</button>
        </div>
        </div>
    </div>
    <div className='lg:hidden grid grid-cols-2 w-[80%] md:w-[60%] bg-neutral-200 rounded-lg gap-5 p-3 mx-3 mt-20 items-center text-center md:right-0'>
            {bookingParameters.map((item, index)=>(
            <div key={item.id} className={`flex items-center `}>
            <div className='text-gray-500 bg-black/5 p-2 rounded-full'>{item.icon}</div>
            <div className='flex flex-col'>
                <span className='text-xs font-bold text-black'>{item.title}</span>
                <span className='text-sm text-gray-500 font-medium'>{item.value}</span>
            </div>
           {item.hasDropdown && <ChevronDown size={14} className='text-gray-400 ml-2'/>}
            
        </div>))}
        <button className='col-span-2 bg-[#9aacbb] hover:bg-neutral-300 rounded-lg mx-10 px-4 py-3 font-semibold text-sm text-black whitespace-nowrap tracking-tighter '>Book Your Stay</button>
        </div>
    </div>

  )
}

export default Header
