'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { roomsData } from '../utils/roomInfo.utils'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, CreditCard, Lock, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import { countryCodes } from '../utils/countryCode.utils'

interface BookingFormData{
    checkIn: string
    checkOut: string
    adults: number
    children: number
    firstName: string
    lastName: string
    email: string
    phone: string
    countryCode: string
    specialRequests: string
    paymentMethod: 'card' | 'upi' | 'netBanking'
    cardNumber: string
    expiryDate: string
    cvv: string
    cardName: string
    agreeToTerms: boolean
}
const BookingPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const roomSlug = searchParams.get('room') || 'alpine-loft'

    const room = roomsData.find(r => r.slug === roomSlug)

    const getTodayDate = () => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    const getMaxDate = (checkIn: string) => {
        const maxDate = new Date(checkIn)
        maxDate.setDate(maxDate.getDate()+10)
        return maxDate.toISOString().split('T')[0]
    }

    const [formData, setFormData] = useState<BookingFormData>({
        checkIn: getTodayDate(),
        checkOut: getTodayDate(),
        adults: 2,
        children: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+91',
        specialRequests: '',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        agreeToTerms: false
    })

    const [errors, setErrors] = useState<Partial<BookingFormData>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // calculate total nights and price
    const checkInDate = new Date(formData.checkIn)
    const checkOutDate = new Date(formData.checkOut)
    const totalNights = Math.max(1, Math.ceil((checkOutDate.getTime()-checkInDate.getTime()) / (1000 *60*60*24)))
    const pricePerNight = parseInt(room?.price.replace('$', '') || '0')
    const totalPrice = totalNights * pricePerNight
    const tax = Math.round(totalPrice*0.12)
    const finalTotal = totalPrice + tax

    const validateForm = (): boolean => {
        const newErrors: Partial<BookingFormData> = {}

        // date validation
        if(formData.checkIn >= formData.checkOut){
            newErrors.checkOut = 'Check-out date must be after check-in date'
        }
        if(formData.checkIn < getTodayDate()){
            newErrors.checkIn = 'Check-in date can not be in the past'
        }
        if(formData.checkOut > getMaxDate(formData.checkIn)){
            newErrors.checkOut = 'Check-out date exceeds maximum allowed date'
        }

        // guest validation
        const totalGuests = formData.adults + formData.children
        const maxGuests = parseInt(room?.capacity.split(' ')[0] || '0')
        if(totalGuests > maxGuests){
            newErrors.adults = 0
        }

        // personal info validation
        if(!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if(!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if(!formData.email.trim()) newErrors.email = 'Email is required'
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if(!formData.phone.trim()) newErrors.phone = 'Phone number is required'

        // payment validation
        if(formData.paymentMethod === 'card'){
            if(!formData.cardName.replace(/\s/g, '').match(/^\d{16}$/)){
                newErrors.cardNumber = 'Valid 16-digit card number required'
            }
            if(!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)){
                newErrors.expiryDate = 'Valid expiry date (MM/YY) required'
            }
            if(!formData.cvv.match(/^\d{3,4}$/)){
                newErrors.cvv = 'Valid CVV required'
            }
            if(!formData.cardName.trim()) newErrors.cardName = 'Cardholder name required'
        }
        if(!formData.agreeToTerms){
            newErrors.agreeToTerms = false
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: keyof BookingFormData, value: string | number | boolean) => {
        setFormData(prev => ({...prev, [field]: value}))
        if(errors[field]){
            setErrors(prev => ({...prev, [field]: undefined}))
        }
    }

    const formatCardNumber = (value: string) => {
        const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = val.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []
        for(let i=0, len=match.length; i<len;i+=4){
            parts.push(match.substring(i, i+4))
        }
        if(parts.length){
            return parts.join(' ')
        }else{
            return val
        }
    }

    const formatExpiryDate = (value: string) => {
        const val = value.replace(/\D/g, '')
        if(val.length >= 2){
            return val.substring(0,2) + '/' + val.substring(2,4)
        }
        return val
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if(!validateForm()){
            return
        }

        setIsSubmitting(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Demo: Prepare booking data to store 
        const bookingDataToStore = {
            roomName: room?.name,
            location: room?.location,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            totalNights,
            adults: formData.adults,
            children: formData.children,
            totalPrice: finalTotal,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            countryCode: formData.countryCode,
            specialRequests: formData.specialRequests,
            paymentMethod: formData.paymentMethod,
            // Generate a unique booking ID
            bookingId: Math.random().toString(36).substring(2, 9).toUpperCase()
        }

        // Store in localStorage
        localStorage.setItem('bookingData', JSON.stringify(bookingDataToStore))

        // TODO: Send data to backend API
        console.log('Booking Submitted:', bookingDataToStore)

        // redirect to confirmation page
            router.push('/booking/confirmation')
            
        } catch (error) {
            alert('Booking failed. Please try again.')
        } finally{
            setIsSubmitting(false)
        }
    }

    if(!room){
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-black mb-4'>Room Not Found</h1>
                    <Link href='/' className='text-amber-600 hover:text-amber-700'>Return to Home Page</Link>
                </div>
            </div>
        )
    }

  return (
    <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <div className='bg-white shadow-sm border-b'>
            <div className='max-w-6xl mx-auto px-6 md:px-20 py-4'>
            <div className='flex items-center justify-between'>
                <Link href='/' className='flex items-center gap-2 text-gray-600 hover:text-black transition-colors'>
                <ArrowLeft size={20} />Back to Home Page
                </Link>
                <div className='text-center'>
                    <h1 className='text-xl font-bold text-black'>Complete Your Booking</h1>
                    <p className='text-sm text-gray-500'>Secure checkout in 3 easy steps</p>
                </div>
                <div className='w-20'></div>
            </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 md:px-20 py-8 text-gray-500'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

            {/* Booking Form */}
            <div className='lg:col-span-2 space-y-8'>
                {/* Booking Details */}
                <div className='bg-white rounded-2xl p-6 shadow-sm'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-sm'>1</div>
                        <h2 className='text-xl font-bold text-black'>Booking Details</h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* check-in */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Check-in Date</label>
                            <input
                    type='date'
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    min={getTodayDate()}
                    max={getMaxDate(formData.checkIn)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.checkIn ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors.checkIn && <p className='text-red-500 text-sm mt-1'>{errors.checkIn}</p>}
                </div>
                {/* check-out */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Check-out Date</label>
                  <input
                    type='date'
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    min={formData.checkIn}
                    max={getMaxDate(formData.checkIn)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.checkOut ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors.checkOut && <p className='text-red-500 text-sm mt-1'>{errors.checkOut}</p>}
                </div>
            </div>
            {/* Guest details */}
            <div className='mt-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Number of guests</label>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-xs text-gray-500 mb-1'>Adults (13+)</label>
                            <select
                            value={formData.adults}
                            onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none'>
                                {Array.from({length:10}, (_,i) => i +1).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                    </div>
                    <div>
                        <label className='block text-xs text-gray-500 mb-1'>Children (0-12)</label>
                        <select
                        value={formData.children}
                        onChange={(e)=> handleInputChange('children', parseInt(e.target.value))}
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none'>
                            {Array.from({length:11}, (_,i) => i).map(num =>(
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.adults && <p className='text-red-500 text-sm mt-1'>{errors.adults}</p>}
            </div>
            </div>

            {/* Guest Information */}
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-sm'>2</div>
                    <h2 className='text-xl font-bold text-black'>Guest Information</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                       <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                  <input
                    type='text'
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder='Enter first name'
                  />
                  {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>} 
                </div>

                <div>
                   <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                  <input
                    type='text'
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder='Enter last name'
                  />
                  {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>} 
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder='Enter email address'
                  />
                  {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                  <div className='flex gap-2'>
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      className='px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none'
                    >
                    {countryCodes.map((country) => (
                        <option key={country.code + country.country} value={country.code}>{country.flag} {country.code}</option>
                    ))}
                    </select>
                    <input
                      type='tel'
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder='Enter phone number'
                    />
                  </div>
                  {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
                </div>
                </div>

                <div className='mt-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Special Requests (Optional)</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={3}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all resize-none'
                  placeholder='Any special requests or requirements...'
                />
              </div>

            </div>

            {/* Payment Information */}
            <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-3'>Payment Method</label>
                <div className='space-y-3'>
                    <label className='flex items-center gap-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 transition-colors'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='card'
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className='text-amber-400 focus:ring-amber-400'
                    />
                    <CreditCard size={20} className='text-gray-600' />
                    <span className='font-medium'>Credit/Debit Card</span>
                  </label>
                {/* UPI */}
                  <label className='flex items-center gap-3 p-4 border border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 transition-colors'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='upi'
                      checked={formData.paymentMethod === 'upi'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className='text-amber-400 focus:ring-amber-400'
                    />
                    <div className='w-5 h-5 bg-blue-600 rounded'></div>
                    <span className='font-medium'>UPI</span>
                  </label>
                </div>
            </div>

            {/* Card Details */}
            {formData.paymentMethod === 'card' && (
                <div className='space-y-8'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Card Number</label>
                    <input
                      type='text'
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder='1234 5678 9012 3456'
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className='text-red-500 text-sm mt-1'>{errors.cardNumber}</p>}
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Expiry Date</label>
                      <input
                        type='text'
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder='MM/YY'
                        maxLength={5}
                      />
                      {errors.expiryDate && <p className='text-red-500 text-sm mt-1'>{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>CVV</label>
                      <input
                        type='text'
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.cvv ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder='123'
                        maxLength={4}
                      />
                      {errors.cvv && <p className='text-red-500 text-sm mt-1'>{errors.cvv}</p>}
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Cardholder Name</label>
                    <input
                      type='text'
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${errors.cardName ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder='Enter cardholder name'
                    />
                    {errors.cardName && <p className='text-red-500 text-sm mt-1'>{errors.cardName}</p>}
                </div>
                </div>
            )}

            {/* Terms and Conditions */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
                <label className='flex items-start gap-3 cursor-pointer'>
                    <input
                    type='checkbox'
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className='mt-1 text-amber-400 focus:ring-amber-400 rounded'
                  />
                  <div className='text-sm text-gray-600'>
                    I agree to the{' '}
                    <Link href='/terms' className='text-amber-600 hover:text-amber-700 underline'>
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href='/privacy' className='text-amber-600 hover:text-amber-700 underline'>
                      Privacy Policy
                    </Link>
                    . I understand that this booking is non-refundable.
                  </div>
                </label>
                {errors.agreeToTerms===false && <p className='text-red-500 text-sm mt-1'> Please accept terms and condition to continue with booking</p>}
            </div>
            </div>
        </div>

        {/* Booking Summary Sidebar */}
        <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl p-6 shadow-sm sticky top-8'>
                <h3 className='text-lg font-bold text-black mb-4'>Booking Summary</h3>

                {/* Room Info */}
                <div className='md:flex gap-4 mb-6'>
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  width={350}
                  height={150}
                  priority
                  className='rounded-xl object-cover'/>
                  <div className='mt-4 md:mt-0'>
                  <h4 className='font-semibold text-black'>{room.name}</h4>
                  <div className='flex items-center gap-1 text-sm text-gray-600 mb-1'>
                    <MapPin size={14} />
                    {room.location}
                  </div>
                  <div className='flex items-center gap-1 text-sm text-gray-600'>
                    <Users size={14} />
                    Up to {room.capacity}
                  </div>
                </div>
                </div>

                {/* Dates */}
                <div className='space-y-3 mb-6'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Check-in</span>
                  <span className='font-medium'>{new Date(formData.checkIn).toLocaleDateString('en-GB')}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Check-out</span>
                  <span className='font-medium'>{new Date(formData.checkOut).toLocaleDateString('en-GB')}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Guests</span>
                  <span className='font-medium'>{formData.adults + formData.children} ({formData.adults} adults, {formData.children} children)</span>
                </div>
              </div>

              {/* Highlights */}
              <div className='mb-6'>
                <h4 className='font-semibold text-black mb-3'>Room Highlights</h4>
                <ul className='space-y-2'>
                  {room.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className='text-sm text-gray-600 flex items-center gap-2'>
                      <CheckCircle size={14} className='text-green-500 shrink-0' />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className='border-t border-gray-200 pt-6 space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>${pricePerNight} × {totalNights} nights</span>
                  <span className='font-medium'>${totalPrice}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Taxes & fees</span>
                  <span className='font-medium'>${tax}</span>
                </div>
                <div className='flex justify-between items-center text-lg font-bold text-black border-t border-gray-200 pt-3'>
                  <span>Total</span>
                  <span>${finalTotal}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className='mt-6 p-4 bg-green-50 rounded-xl'>
                <div className='flex items-center gap-2 text-green-700 mb-2'>
                  <Lock size={16} />
                  <span className='font-medium text-sm'>Secure Booking</span>
                </div>
                <p className='text-xs text-green-600'>
                  Your payment information is encrypted and secure. We use SSL encryption and comply with PCI standards.
                </p>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='w-full mt-6 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-300 text-black font-bold py-4 rounded-xl transition-colors disabled:cursor-not-allowed'
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
                    Processing...
                  </div>
                ) : (
                  `Book Now - $${finalTotal}`
                )}
              </button>

              <p className='text-xs text-gray-500 text-center mt-3'>
                You won't be charged until your booking is confirmed
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
