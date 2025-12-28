'use client'
import { Calendar, CheckCircle, Download, Mail, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const ConfirmationPage = () => {
    // Retrieve and parse booking data from localStorage
    const storedData = localStorage.getItem('bookingData')
    const bookingData = storedData ? JSON.parse(storedData) : null

    // If no data, show a fallback or redirect
    if (!bookingData) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-black mb-4'>No Booking Data Found</h1>
                    <p className='text-gray-600 mb-4'>Please complete your booking first.</p>
                    <Link href='/booking' className='text-amber-600 hover:text-amber-700 font-semibold'>
                        Go to Booking Page
                    </Link>
                </div>
            </div>
        )
    }

    // Format dates for display
    const checkInFormatted = new Date(bookingData.checkIn).toLocaleDateString('en-GB')
    const checkOutFormatted = new Date(bookingData.checkOut).toLocaleDateString('en-GB')

    

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-6'>
        <div className='max-w-2xl mx-auto text-center mt-10'>
            {/* Success icon */}
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600'>
                <CheckCircle size={40} className='text-green-600'/>
            </div>

            {/* Success Message */}
            <h1 className='text-3xl font-bold text-black mb-4'>Booking Confirmed!</h1>
            <p className='text-gray-600 mb-8'>
                Thank You for choosing WildSpirit. Your Himalyan escape awaits!
            </p>

            {/* Booking Details card */}
            <div className='bg-white rounded-2xl p-8 shadow-sm mb-8 text-left'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-bold text-black'>Booking Details</h2>
                    <span className='text-sm text-gray-500'>ID: {bookingData.bookingId}</span>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center'>
                            <MapPin size={20} className='text-amber-600'/>
                        </div>
                        <div>
                            <p className='font-medium text-black'>{bookingData.roomName}</p>
                            <p className='text-sm text-gray-600'>{bookingData.location}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center'>
                            <Calendar size={20} className='text-amber-600'/>
                        </div>
                        <div>
                            <p className='font-medium text-black'>Check-in: {checkInFormatted} </p>
                            <p className='text-sm text-gray-600'>Check-out: {checkOutFormatted} ({bookingData.totalNights} nights)</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center'>
                            <Users size={20} className='text-amber-600'/>
                        </div>
                        <div>
                            <p className='font-medium text-black'>{bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''} 
                                {bookingData.children > 0 ? `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren' : ''}`: ''}</p>
                            <p className='text-sm text-gray-600'>Total: ${bookingData.total}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                {/* TODO: add a download logic */}
                <button className='flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-xl transition-colors'>
                    <Download size={18}/>
                    Download Reciept
                </button>

                <button className='flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-colors'>
                    <Mail size={18}/>
                    Email Confirmation
                </button>
            </div>

            {/* Additional Info */}
            <div className='mt-8 p-6 bg-blue-50 rounded-xl'>
                <h3 className='font-semibold text-black mb-2'>What's Next?</h3>
                <ul className='text-sm text-blue-800 space-y-1 text-left mx-5'>
                <li>• You'll receive a confirmation email within 5 minutes</li>
                <li>• Check-in instructions will be sent 24 hours before arrival</li>
                <li>• Contact us at hello@wildspirit.com for any questions</li>
                </ul>
            </div>

            {/* Back to Home Page */}
            <div className='mt-8 mb-10'>
                <Link href='/' className='text-amber-600 hover:text-amber-700 font-semibold'>
                Return to Home Page</Link>
            </div>
        </div>
      
    </div>
  )
}

export default ConfirmationPage
