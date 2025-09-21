import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { Mail, MapPin, Phone, Briefcase } from 'lucide-react';

const Contect = () => {
  return (
    <div className="px-5 sm:px-10">
      {/* Page Title */}
      <div className="text-center text-3xl pt-12 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="mt-3 text-gray-500 text-base">
          We’d love to hear from you! Get in touch with us for any queries.
        </p>
      </div>

      {/* Main Section */}
      <div className="my-14 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {/* Left Side Image */}
        <div className="flex-1">
          <img
            src={assets.contact_img}
            alt="contact"
            className="w-full md:max-w-[500px] rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side Info */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Store Info */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-xl text-gray-700 flex items-center gap-2">
              <MapPin size={20} /> Our Store
            </h3>
            <p className="mt-2 text-gray-500">
              Gulistan e Johar, Block 18, Rabia City Commercial 2 <br />
              Karachi, Pakistan
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-xl text-gray-700 flex items-center gap-2">
              <Phone size={20} /> Contact
            </h3>
            <p className="mt-2 text-gray-500">
              Phone: (+92) 345 1081010 <br />
              Email: <span className="text-blue-600">amchemicalstore@gmail.com</span>
            </p>
          </div>

          {/* Careers */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-xl text-gray-700 flex items-center gap-2">
              <Briefcase size={20} /> Careers at Forever
            </h3>
            <p className="mt-2 text-gray-500">
              Learn more about our teams. <br /> Click the WhatsApp icon to connect.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contect;
