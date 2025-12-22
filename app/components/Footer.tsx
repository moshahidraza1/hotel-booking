import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { GiLoveInjection } from 'react-icons/gi'

const Footer = () => {
    const quickLinks = [
    { name: 'Rooms', href: '#rooms' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Contact', href: '#contact' },
    { name: 'About Us', href: '#about' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cancellation Policy', href: '#cancellation' },
    { name: 'Cookie Policy', href: '#cookies' }
  ]

  const socialLinks = [
    { icon: <FaInstagram size={20} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaFacebook size={20} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={20} />, href: 'mailto:hello@wildspirit.com', label: 'Email' }
  ]

  return (
    <footer className='w-full bg-neutral-900 text-white'>
        {/* Footer content */}
        <div className='px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            {/* Brand Column */}
            <div className='lg:col-span-1'>
                <h3 className='text-2xl font-bold mb-4'>WildSpirit</h3>
                <p className='text-gray-400 leading-relaxed mb-6 text-sm'>Escape the ordinary. Reconnect with nature in our Himalayan sanctuary where luxury meets wilderness.
            </p>

            {/* Social Links */}
            <div className='flex gap-3'>
                {socialLinks.map((social)=>(
                    <a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-400 flex items-center justify-center transition-all hover:text-black'
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className='font-semibold mb-6 text-lg'>Quick Links</h4>
                <ul className='space-y-3'>
                    {quickLinks.map((link)=>(
                        <li key={link.name}>
                            <Link 
                            href={link.href} className='text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group'>
                                <span className='w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300 whitespace-nowrap'></span>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Legal */}
            <div>
                <h4 className='font-semibold mb-6 text-lg'>Legal</h4>
                <ul className='space-y-3'>
                    {legalLinks.map((link)=>(
                        <li key={link.name}>
                            <Link href={link.href}
                            className='text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group'>
                            <span className='w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300'></span>
                            {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact Info */}
            <div>
                <h4 className='font-semibold mb-6 text-lg'>Contact Us</h4>
                <div className='space-y-4 text-sm'>
                    <div className='flex items-start gap-3 text-gray-400'>
                        <MapPin size={18} className='text-amber-400 shrink-0 mt-1'/>
                        <span>Manali, Himachal Pradesh<br/>India, 175131</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-400'>
                        <Phone size={18} className='text-amber-400 shrink-0'/>
                        <a href='tel: +919999999999' className='hover:text-amber-400 transition-colors'>
                            +91 99999 99999
                        </a>
                    </div>
                    <div className='flex items-center gap-3 text-gray-400'>
                        <Mail size={18} className='text-amber-400 shrink-0'/>
                        <a href='mailto:hello@wildspirit.com' className='hover:text-amber-400 transition-colors'>
                            hello@wildspirit.com
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* Newsletter Section */}
        <div className='border-t border-neutral-800 px-6 md:px-20 py-8'>
            <div className='max-w-2xl mx-auto text-center'>
                <h4 className='font-semibold text-lg mb-2'>Stay Updated</h4>
                <p className='text-gray-400 text-sm mb-4'>Subscribe to our newsletter for exclusive offers and travel tips</p>
                <form className='flex gap-2 max-w-md mx-auto'>
                    <input
                    type='email'
                    placeholder='Enter your email'
                    className='flex-1 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-sm'
                    required/>
                    <button
                    type='submit'
                    className='bg-amber-400 hover:bg-amber-500 text-black font-semibold px-4 py-3 rounded-xl transition-all text-sm'>
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-neutral-800 px-6 md:px-20 py-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500'>
                <p>© 2025 WildSpirit. All rights reserved.</p>
                <p className='flex items-center gap-2'>
                    Made with <span className='text-red-500'>❤️</span> for nature lovers
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
