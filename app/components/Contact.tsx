'use client'
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react'
import { countryCodes } from '../utils/countryCode.utils';

const Contact = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    checkIn: '',
    checkOut: '',
    message: ''
  })

  // phone formatting
  const formatPhoneNumber = (value: string) =>{
    const numbers = value.replace(/\D/g, '')
    const limited = numbers.slice(0,10)

    if(limited.length <= 5){
        return limited
    }
    return `${limited.slice(0,5)} ${limited.slice(5)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({
        ...formData,
        phone: formatted
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: add submission logic

    const cleanFormData = {
        ...formData,
        phone: formData.countryCode + formData.phone.replace(/\s/g, '')
    }

    console.log('Form Submitted Successfully', formData)
    alert('Thank you! We will get back to you within 24 hours.')

  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
       setFormData({
        ...formData,
        [e.target.name]:e.target.value
        })
    }

  return (
    <section id='contact' className='w-full py-24 px-6 md:px-20 bg-white'>
        <div className='max-w-6xl mx-auto'>
            {/* Heading */}
            <div className='text-center mb-16'>
                <span className='text-amber-600 font-medium text-sm uppercase'>Get In Touch</span>
                <h2 className='text-4xl md:text-5xl font-bold text-black mt-3'>Let's Plan Your <br/> Perfect Stay
                </h2>
                <p className='text-gray-500 mt-4 max-w-2xl mx-auto'>Have questions or ready to book?<br/>Fill out the form below and our team will respond within 24 hours</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
                {/* Left side: Contact Info */}
                <div className='space-y-8'>
                    <div>
                        <h3 className='font-bold text-xl text-black mb-6'>Contact Information</h3>
                        <div className='space-y-4'>
                            {/* Location */}
                            <div className='flex items-start gap-4'>
                                <div className='w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0'>
                                    <MapPin size={18} className='text-amber-600'/>
                                </div>
                                <div>
                                    <p className='font-semibold text-black'>Location</p>
                                    <p className='text-sm text-gray-500 mt-1'>Manali, Himachal Pradesh<br/>India, 175131</p>
                                </div>
                            </div>
                        {/*Hotel Phone*/}
                            <div className='flex gap-4 items-center'>
                                <div className='w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0'>
                                    <Phone size={18} className='text-amber-600'/>
                                </div>
                                <div><p className='font-semibold text-black'>Phone</p>
                                <p className='text-sm text-gray-500 mt-1'>+91 99999 99999</p>
                                </div>
                            </div>
                        {/* Email */}
                        <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0'>
                                <Mail size={18} className='text-amber-600'/>
                            </div>
                            <div>
                                <p className='font-bold text-black'>Email</p>
                                <p className='text-gray-500 text-sm mt-1'>hello@wildspirit.com</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className='ng-amber-50 p-6 rounded-2xl'>
                        <h4 className='font-semibold text-black mb-3'>Business Hours</h4>
                        <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex justify-between'>
                                <span>Monday - Sunday</span>
                                <span className='font-medium'>24 Hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Contact Form */}
                <div className='lg:col-span-2'>
                    <form onSubmit={handleSubmit} className='bg-gray-50 p-8 rounded-3xl border border-gray-200 text-gray-600'>
                        {/* Name and Email */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            {/* Name */}
                            <div>
                                <label htmlFor='name' className='block text-sm font-semibold text-black mb-2'>
                                    Full Name *
                                </label>
                                <input type='text' id='name' name='name'
                                required value={formData.name}
                                onChange={handleChange} className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all'
                                placeholder='Martin Dan'/>
                            </div>
                            {/* Email */}
                            <div>
                                <label htmlFor='email' className='block font-semibold text-sm text-black mb-2'>
                                    Email Address *
                                </label>
                                <input
                                type='email' id='email'
                                name='email'
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus-ring-2 focus:ring-amber-100 outline-none transition-all'
                                placeholder='martin@example.com'/>
                            </div>
                        </div>

                        {/* Phone with country code */}
                        <div className='mb-6'>
                            <label htmlFor='phone' className='block text-sm font-semibold text-black mb-2'>
                                Phone Number (Optional)
                            </label>
                            <div className='flex gap-2'>
                                {/* Country code Dropdown */}
                                <select
                                name='countryCode'
                                value={formData.countryCode}
                                onChange={handleChange}
                                className='w-32 px-4 py-3  rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all bg-white text-sm'>
                                    {countryCodes.map((country) => (
                                        <option key={country.code + country.country} value={country.code}>{country.flag} {country.code}</option>
                                    ))}
                                </select>
                            
                            <input type='tel'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            maxLength={11}
                            className='flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all
                            '
                            placeholder='99999 99999'/>
                        </div>

                        </div>

                        {/* Check-in & Check-out */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            {/* Check-in */}
                            <div>
                                <label htmlFor='checkIn' className='block text-sm font-semibold text-black mb-2'>
                                    Check-in Date
                                </label>
                                <input
                                type='date'
                                id='checkIn'
                                name='checkIn'
                                value={formData.checkIn}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all'
                                />
                            </div>

                            {/* Check-out */}
                            <div>
                                <label htmlFor='checkOut' className='font-semibold text-black text-sm block mb-2'>
                                    Check-out Date
                                </label>
                                <input type='date' id='checkOut'
                                 name='checkOut'
                                 value={formData.checkOut}
                                 onChange={handleChange}
                                 className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all'/>
                            </div>
                        </div>

                        {/* Message */}
                        <div className='mb-6'>
                            <label htmlFor='message' className='block font-semibold text-black text-sm mb-2'>
                                Your Message *
                            </label>
                            <textarea id='message'
                            name='message'
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none'
                            placeholder='Tell us about your perfect escape...'/>
                        </div>

                        {/* Submit Button */}
                        <button className='mx-auto bg-amber-400 hover:bg-amber-500 text-black font-semibold tracking-tight px-3 py-3 rounded-2xl transition-all flex items-center justify-center gap-2'>
                            Send Message
                            <Send size={18}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact
