'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Home, Calendar, Users, ChevronDown, Minus, Plus } from 'lucide-react'
import NavBar from './NavBar'


const Header = () => {
    // get today's date
    const getTodayDate = () => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    // get max date (10 days from today)
    const getMaxDate = (checkIn:string) => {
        const maxDate = new Date(checkIn)
        maxDate.setDate(maxDate.getDate()+10)
        return maxDate.toISOString().split('T')[0]
    }

    const [bookingData, setBookingData] = useState({
        room: 'Tree House',
        checkIn: getTodayDate(),
        checkOut: getTodayDate(),
        adults: 2,
        children: 0
    })

    const [openDropdown, setOpenDropdown] = useState<string|null>(null)

    //Room options
    const roomOptions = ['Tree House', 'Alpine Loft', 'Forest Glass Cabin', 'Lakeside Retreat', 'Mountain View Suite']


    const bookingParameters = [
        {
            id: 1,
            icon: <Home size={18} />,
            title: 'Room',
            value: bookingData.room,
            type: 'dropdown',
            key: 'room'
        },
        {
            id: 2,
            icon: <Calendar size={18} />,
            title: 'Check-in',
            value: new Date(bookingData.checkIn).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
            type: 'date',
            key: 'checkIn'
        },
        {
            id: 3,
            icon: <Calendar size={18} />,
            title: 'Check-out',
            value: new Date(bookingData.checkIn).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
            type: 'date',
            key: 'checkOut'
        },
        {
            id: 4,
            icon: <Users size={18} />,
            title: 'Guests',
            value: `${bookingData.adults} Adult${bookingData.adults > 1 ? 's' : ''}${bookingData.children > 0 ? `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren': ''}`:''}`,
            type: 'guests',
            key: 'guests'
        }
    ]

    const handleDropdownSelect = (key:string, value:string) =>{
        setBookingData({
            ...bookingData,
            [key]: value
        })
        setOpenDropdown(null)
    }

    const handleDateChange = (key: string, value: string) =>{
        setBookingData(prev => {
            if(key === 'checkIn'){
                const newCheckIn = value
                const newCheckOut = prev.checkOut < newCheckIn ? newCheckIn : prev.checkOut
                return {...prev, checkIn: newCheckIn, checkOut: newCheckOut}
            }else{
                if(value < prev.checkIn){
                    alert('Check-out date cannot be before check-in date')
                    return prev
                }
                const maxDate = getMaxDate(prev.checkIn)
                if(value > maxDate){
                    alert(`Check-out cannot be later than ${maxDate}`)
                    return prev
                }
                return {...prev, checkOut: value}
            }
        })
        
    }

    const handleGuestChange = (type: 'adults' | 'children', action: 'increment' | 'decrement') => {
        setBookingData(prev => {
            const currentValue = prev[type]
            if(action === 'increment' && currentValue < 10){
                return { ...prev, [type]: currentValue + 1 }
            }
            if(action === 'decrement' && currentValue > (type === 'adults' ? 1 : 0)){
                return {...prev, [type]:currentValue - 1}
            }
            return prev
        })
    }

    const handleBooking = () =>{
        console.log('Booking Data:', bookingData)
        alert(`Booking Request:\nRoom: ${bookingData.room}\nCheck-in: ${bookingData.checkIn}\nCheck-out: ${bookingData.checkOut}\nGuests: ${bookingData.adults} Adults, ${bookingData.children} Children`)
    }

  return (
    <div className='bg-[#FDFCF8] flex flex-col items-center'>
    <div className='relative w-screen h-screen '>
        <Image src={'https://res.cloudinary.com/ddvhuxa9f/image/upload/v1766481135/Hotel_Booking_Hero_nnetew.png'} alt='Hero background' fill className='object-cover' priority/>
        <div className='absolute inset-5 md:inset-10 lg:inset-20 border-4 rounded-[30px] border-white/80 z-20'>
        <NavBar/>
        <div className='flex flex-col text-left lg:items-center justify-center lg:text-center space-y-1 sm:space-y-4 p-5 bg-linear-to-t from-black/5 via-black/5 to-transparent'>
        <h1 className='text-3xl md:text-5xl font-bold text-black tracking-tight '>Find Your <br/>
        <span className='text-[#f6f9fa] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>Wild Escape in Himalyas</span>
        </h1>
        <p className="text-white sm:max-w-lg lg:max-w-2xl text-sm md:text-base font-medium mt-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Experience the perfect blend of luxury and wilderness in our exclusive Himalayan sanctuary. A private retreat crafted for your ultimate escape.
            </p>
        </div>

        {/* Desktop Booking Bar */}
        <div className='hidden xl:flex absolute bottom-0 h-20 w-[90%] left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-50 items-center justify-between shadow-lg px-8 text-neutral-500'>
        {bookingParameters.map((item, index)=>(
            <div key={item.id} className={`flex items-center gap-3 ${index!== bookingParameters.length-1 ? 'border-r border-gray-200 pr-2 pl-2':''}`}>
            <div className='text-gray-500 bg-black/5 p-2 rounded-full'>{item.icon}</div>
            {/* <Icon/> */}
            <div className='flex flex-col'>
                <span className='text-xs font-bold text-black'>{item.title}</span>

                {/* Date input field */}
                {item.type === 'date' ? (
                    <input
                    type='date'
                    value={bookingData[item.key as keyof typeof bookingData]}
                    onChange={(e) => handleDateChange(item.key, e.target.value)}
                    min={item.key === 'checkIn' ? getTodayDate() : bookingData.checkIn}
                    max={item.key === 'checkOut' ? getMaxDate(bookingData.checkIn): ''}
                    className='text-sm text-gray-700 font-medium border-none outline-none bg-transparent cursor-pointer'/>
                ):(
                    <button onClick={()=>setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    className='text-sm text-gray-700 font-medium text-left hover:text-black transition-colors'>{item.value}</button>
                )}
            </div>
            <ChevronDown 
                    size={14} 
                    className={`${item.type!=='date'?'flex':'hidden'} text-gray-400 ml-2 transition-transform cursor-pointer ${openDropdown === item.key ? 'rotate-180' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                />
           {/* Room dropdown Menu */}
           {item.type === 'dropdown' && openDropdown === item.key && (
            <div className='absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 min-w-55 z-50'>
                {roomOptions.map((option) => (
                    <button
                    key={option}
                    onClick={()=> handleDropdownSelect(item.key, option)}
                    className='w-full px-4 py-2 text-left text-sm hover:bg-amber-50 transition-colors text-gray-700 hover:text-black'>
                        {option}
                    </button>
                ))}
            </div>
           ) }

           {/* Guest Counter Dropdown */}
           {item.type === 'guests' && openDropdown === item.key && (
            <div className='absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-70 z-50 whitespace-nowrap'>
                {/* Adults */}
                <div className='flex items-center justify-between mb-4'>
                    <div>
                        <p className='font-semibold text-black text-sm'>Adults</p>
                        <p className='text-xs text-gray-700'>Ages 13+</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button 
                        onClick={()=>handleGuestChange('adults', 'decrement')}
                        disabled={bookingData.adults<=1}
                        className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                            <Minus size={14}/>
                        </button>
                        <span className='w-8 text-center font-semibold text-black'>{bookingData.adults}</span>
                        <button
                        onClick={() => handleGuestChange('adults', 'increment')}
                        disabled={bookingData.adults >=10}
                        className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray=100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                            <Plus size={14}/>
                        </button>
                    </div>
                </div>

                {/* Children */}
                <div className='flex items-center justify-between ot-4 border-t border-gray-200'>
                    <div>
                        <p className='text-black text-sm font-semibold'>Children</p>
                        <p className='text-xs text-gray-500'>Ages 0-12</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button onClick={()=> handleGuestChange('children', 'decrement')}
                        disabled={bookingData.children <=0}
                        className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                            <Minus size={14}/>
                        </button>
                        <span className='w-8 text-center text-black font-semibold'>{bookingData.children}</span>
                        <button
                        onClick={()=>handleGuestChange('children', 'increment')}
                        disabled={bookingData.children>=10}
                        className='w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disbled:opacity-50 disabled:cursor-not-allowed'>
                            <Plus size={14}/>
                        </button>
                    </div>
                </div>

                {/* Done button */}
                <button onClick={()=>setOpenDropdown(null)}
                className='w-full mt-4 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 rounded-xl transition-colors text-sm'>Done</button>
            </div>
           )}

            
        </div>))}
        
        <button className='bg-[#9aacbb] hover:bg-neutral-300 rounded-full px-4 py-3 font-semibold text-sm text-black whitespace-nowrap tracking-tighter'>Book Your Stay</button>
        </div>
        </div>
    </div>

    {/* Mobile & Tablet Booking Section */}
    <div className='xl:hidden absolute bottom-7 md:bottom-15 lg:bottom-25 w-[85%] md:w-[70%] bg-amber-50 rounded-[25px] shadow-lg p-4 left-1/2 -translate-x-1/2 z-25'>
        <div className='grid grid-cols-2 gap-4 mb-4'>
            {bookingParameters.map((item, index)=>(
            <div key={item.id} className='relative flex items-center gap-1 bg-white rounded-xl pt-4'>
                <div className='text-gray-500 bg-black/5 p-1 rounded-full shrink-0'>{item.icon}</div>
                <div className='flex flex-col flex-1 min-w-0'>
                    <span className='text-xs font-bold text-black mb-1'>{item.title}</span>
                    
                    {/* Mobile - date input field */}
                    {item.type === 'date' ? (
                        <input
                        type='date'
                        value={bookingData[item.key as keyof typeof bookingData]}
                        onChange={(e) => handleDateChange(item.key, e.target.value)}
                        min={item.key === 'checkIn' ? getTodayDate() : bookingData.checkIn}
                        max={item.key === 'checkOut' ? getMaxDate(bookingData.checkIn): ''}
                        className='text-xs text-gray-700 font-medium border-none outline-none bg-transparent cursor-pointer w-full'/>
                    ):(
                        <button 
                            onClick={()=>setOpenDropdown(openDropdown === item.key ? null : item.key)}
                            className='text-xs text-gray-700 font-medium text-left flex items-center justify-between gap-1 w-full'>
                            <span className='truncate'>{item.value}</span>
                            <ChevronDown 
                                size={14} 
                                className='shrink-0 text-gray-400 transition-transform'
                                style={{ transform: openDropdown === item.key ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                        </button>
                    )}

                    {/* Room dropdown for mobile */}
                    {item.type === 'dropdown' && openDropdown === item.key && (
                        <div className='absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 w-full min-w-[200px] z-50'>
                            {roomOptions.map((option)=>(
                                <button
                                key={option}
                                onClick={()=>handleDropdownSelect(item.key, option)}
                                className='w-full px-4 py-2 text-left text-xs hover:bg-amber-50 transition-colors text-gray-700 hover:text-black'>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Guest Counter Dropdown for Mobile */}
                    {item.type === 'guests' && openDropdown === item.key &&(
                        <div className='absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-500 p-4 w-[250px] z-50'>
                            {/* Adults */}
                            <div className='flex items-center justify-between mb-4'>
                                <div>
                                    <p className='font-semibold text-black text-xs'>Adults</p>
                                    <p className='text-gray-500 text-[10px]'>Ages 13+</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button
                                    onClick={()=> handleGuestChange('adults', 'decrement')}
                                    disabled={bookingData.adults <=1}
                                    className='w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                                        <Minus size={12}/>
                                    </button>
                                    <span className='w-6 text-center font-semibold text-black text-sm'>{bookingData.adults}</span>
                                    <button 
                                    onClick={()=>handleGuestChange('adults','increment')}
                                    disabled={bookingData.adults >= 10}
                                    className='w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 transition-colors'>
                                        <Plus size={12}/>
                                    </button>
                                </div>
                            </div>

                            {/* Children */}
                            <div className='flex items-center justify-between pt-4 border-t border-gray-200 mb-3'>
                                <div>
                                    <p className='font-semibold text-black text-xs'>Children</p>
                                    <p className='text-[10px] text-gray-500'>Ages 0-12</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button
                                    onClick={()=> handleGuestChange('children', 'decrement')}
                                    disabled={bookingData.children <=0}
                                    className='w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                                        <Minus size={12}/>
                                    </button>
                                    <span className='w-6 text-center font-semibold text-black text-sm'>{bookingData.children}</span>
                                    <button
                                    onClick={()=> handleGuestChange('children', 'increment')}
                                    disabled={bookingData.children >=10}
                                    className='w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                                        <Plus size={12}/>
                                    </button>
                                </div>
                            </div>

                            {/* Done button */}
                            <button
                            onClick={()=>setOpenDropdown(null)}
                            className='w-full mt-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 rounded-xl transition-colors text-xs'>
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
            ))}
        </div>
        <button
            onClick={handleBooking} 
            className='w-full/2 flex mx-auto  bg-amber-300 hover:bg-neutral-300 rounded-lg px-4 py-3 font-semibold text-sm text-black transition-colors'>
            Book Your Stay
        </button>
    </div>
</div>

  )
}

export default Header
