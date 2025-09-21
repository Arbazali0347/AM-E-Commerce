import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* ABOUT US */}
      <div className="text-3xl text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 items-center md:items-start px-6 md:px-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[420px] rounded-2xl shadow-lg object-cover"
          alt="About AM Chemicals"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 text-base leading-relaxed">
          <p>
            Welcome to <b>AM Chemicals</b>, where we believe in the power of a clean home. We're passionate about providing high-quality, effective, and eco-friendly cleaning products that make your life easier and your home a healthier place.
          </p>
          <p>
            We're more than just a cleaning product company; we're a community. We're committed to providing excellent customer service and building lasting relationships with our customers. Join us in our mission to create cleaner, healthier homes, one product at a time.
          </p>
          <b className="text-gray-900 text-lg">Our Mission</b>
          <p>
            We started AM Chemicals with a simple goal: to offer cleaning solutions that are both effective and safe for your family and the environment. We carefully formulate our products with the finest ingredients, ensuring they deliver exceptional results without harsh chemicals.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-2xl py-6 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 mb-20">
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-8 flex flex-col gap-4 text-center">
          <b className="text-lg text-gray-800">Quality Assurance</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            AM Chemicals is committed to quality. We ensure our cleaning products are effective, safe, and reliable through rigorous testing and careful ingredient selection. We continuously improve our processes to meet and exceed industry standards, always prioritizing your satisfaction and safety.
          </p>
        </div>

        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-8 flex flex-col gap-4 text-center">
          <b className="text-lg text-gray-800">Convenience</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            AM Chemicals is all about making your life easier. We know you're busy, so we've designed our cleaning products with maximum convenience in mind. Our products are not only effective but also incredibly easy to use, saving you valuable time and effort.  
            From packaging to quick-acting formulas, everything is crafted for your ease.  
            With AM Chemicals, you can achieve a sparkling clean home effortlessly.
          </p>
        </div>

        <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-8 flex flex-col gap-4 text-center">
          <b className="text-lg text-gray-800">Exceptional Customer Service</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            We're here for you. Our customer service team is dedicated to providing you with the support you need. Whether you have questions about our products, need help with an order, or just want to chat, we're always happy to help. Your satisfaction is our priority.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
