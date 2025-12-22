'use client'
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number|null>(0);
    const faqs = [
    {
      question: "What's included in the stay?",
      answer: "All stays include daily breakfast, WiFi, guided nature walks, access to all common areas, and complimentary parking. Some packages also include dinner and adventure activities."
    },
    {
      question: "Is the location accessible year-round?",
      answer: "Yes! While winter (December-February) offers snowy landscapes, summer (May-September) is ideal for trekking. We recommend 4WD vehicles during monsoon season."
    },
    {
      question: "Do you allow pets?",
      answer: "We love furry friends! Small to medium-sized dogs are welcome with prior notice. A small cleaning fee applies."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Free cancellation up to 7 days before check-in. Cancellations within 7 days receive a 50% refund. No refunds for same-day cancellations."
    },
    {
      question: "How far is the nearest town?",
      answer: "The property is 45 minutes from the main town. We provide grocery shopping services and can arrange transportation for an additional fee."
    }
]

  return (
    <section className='w-full py-24 px-6 md:px-20 bg-[#FDFCF8]'>
        <div className='text-center mb-12'>
            <span className='text-amber-600 font-medium tracking-wider text-sm uppercase'>Questions?</span>
            <h2 className='text-4xl md:text-5xl font-bold text-black mt-3'>
            Everything You <br/> Need To Know
            </h2>
            </div>

            {/* Faq's and answers */}
            <div>
                {faqs.map((faq, index) => (
                    <div key={index} className='bg-white rounded-2xl border border-gray-200 overflow-hidden  transition-all mb-2'>
                        <button onClick={()=> setOpenIndex(openIndex === index? null: index)} className='width-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors'>
                            <span className='font-semibold text-black text-lg pr-4'>{faq.question}</span>
                            <ChevronDown size={20} className={`shrink-0 text-amber-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180': ''} `}/>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96': 'max-h-0'}`}>
                            <p className='px-6 pb-6 text-gray-600 leading-relaxed'>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact CTA */}
            <div className='mt-12 text-center'>
                <p className='text-gray-500 mb-4'>Still have questions?</p>
                <button className='text-amber-600 font-semibold hover:text-amber-700 transition-colors underline'>Contact Our team</button>
            </div>

    </section>
  )
}

export default FAQ
