import Layout from '@/components/Layout';
import React from 'react'
import { CustomButton } from '@/components/CustomComponents';

const Contact = () => {
  return (
      <Layout>
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-full w-full lg:h-[550px] lg:w-[500px] flex flex-col items-center justify-center px-12 lg:px-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow">
                <div className='my-2'>
                  <h3 className="p-4 border-b-2">
                          Contact Us
                  </h3>
                </div>
                <div className='w-full'>
                  <form className='w-full'>
                      <div className='w-full my-6 lg:my-8 px-6 lg:px-12 flex flex-col gap-4'>
                          <div className="relative">
                              <input type="text" name="name" id="name" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                              <label htmlFor="name" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
                          </div>
                          <div className="relative">
                              <input type="email" name="email" id="email" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                              <label htmlFor="email" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                          </div>
                          <div className="relative mb-2">
                              <input type="text" name="subject" id="subject" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                              <label htmlFor="subject" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">subject</label>
                          </div>
                          <div className="relative mb-2">
                              <textarea name="message" id="message" className="block py-6 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                              <label htmlFor="message" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">message</label>
                          </div>
                          <CustomButton position='w-full py-3'>submit</CustomButton>
                      </div>
                  </form>
                </div>
            </div>
        </div>
      </Layout>
    );
}

export default Contact