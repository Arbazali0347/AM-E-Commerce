import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to AM Chemicals, where we believe in the power of a clean home. We're passionate about providing high-quality, effective, and eco-friendly cleaning products that make your life easier and your home a healthier place.</p>
          <p>We're more than just a cleaning product company; we're a community. We're committed to providing excellent customer service and building lasting relationships with our customers. Join us in our mission to create cleaner, healthier homes, one product at a time.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>We started AM Chemicals with a simple goal: to offer cleaning solutions that are both effective and safe for your family and the environment. We carefully formulate our products with the finest ingredients, ensuring they deliver exceptional results without harsh chemicals.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className="text-gray-600">AM Chemicals is committed to quality. We ensure our cleaning products are effective, safe, and reliable through rigorous testing and careful ingredient selection. We continuously improve our processes to meet and exceed industry standards, always prioritizing your satisfaction and safety.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className=" text-gray-600">AM Chemicals is all about making your life easier. We know you're busy, so we've designed our cleaning products with maximum convenience in mind. Our products are not only effective but also incredibly easy to use, saving you valuable time and effort.

            From our thoughtfully designed packaging to our quick-acting formulas, every detail is crafted for your ease. Our products are designed to streamline your cleaning routine, whether you're doing a quick tidy-up or a more thorough cleaning session.

            We believe that a clean home should be a joy, not a chore. With AM Chemicals, you can achieve a sparkling clean home effortlessly, allowing you to focus on what matters most to you.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">We're here for you. Our customer service team is dedicated to providing you with the support you need. Whether you have questions about our products, need help with an order, or just want to chat, we're always happy to help. Your satisfaction is our priority.</p>
        </div>
      </div>
    </div>
  )
}

export default About;