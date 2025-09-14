import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contect = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className=" text-gray-500">Gulistan e johar block 18 rabia city commercial 2 <br />Karachi, Pakistan</p>
          <p className=" text-gray-500">Contact (+92) 345 1081010 <br/> Email: amchemicalstore@gmail.com </p>
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className=" text-gray-500">Learn more about our teams Click the WhatsApp icon</p>
        </div>
      </div>
    </div>
  )
}

export default Contect;