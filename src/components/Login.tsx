'use client'
import React from 'react'
import { useState } from 'react';
import { CustomButton, CustomLink } from './CustomComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Login = () => {

    const [activeTab,setActiveTab] = useState('signin')

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-full w-full lg:h-[550px] lg:w-[500px] flex flex-col items-center justify-center px-12 lg:px-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow">
            <div className='my-2'>
                <ul className="flex">
                    <li>
                        <h3 className={activeTab === 'signin' ? "p-4 border-b-2" : "p-4 text-[#201F1D]"}>
                                Sign In
                        </h3>
                    </li>
                    <li>
                        <h3 className={activeTab === 'signup' ? "p-4 border-b-2" : "p-4 text-[#201F1D]"}>
                                Sign Up
                        </h3>
                    </li>
                </ul>
            </div>
            <div className='w-full'>
                {
                    activeTab === 'signin'
                        ? (
                            <form className='w-full'>
                                <div className='w-full my-6 lg:my-8 px-6 lg:px-12 flex flex-col gap-4'>
                                    <div className="relative">
                                        <input type="email" name="email" id="email" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="email" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                                    </div>
                                    <div className="relative">
                                        <input type="password" name="password" id="password" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="password" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                                    </div>
                                </div>
                                <div className="relative w-full lg:px-6 flex justify-between">
                                    <div className='flex gap-2'>
                                        <input type="checkbox" name="remember" id="remember" className="py-3 focus:outline-none" required />
                                        <label htmlFor="remember" className="">Remember me?</label>
                                    </div>
                                    <CustomLink position="text-sm lg:text-base" href='' state={true}>Forgot your password?</CustomLink>
                                </div>
                                <div className="w-full my-4 lg:my-8 flex justify-center gap-10">
                                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faGoogle} /></Link>
                                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faFacebookF} /></Link>
                                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faTwitter} /></Link>
                                </div>
                                <CustomButton position='w-full py-3'>sign in</CustomButton>
                                <div className="relative w-full my-4 lg:my-6 flex flex-col items-center justify-center">
                                    <div>
                                        Not a member?
                                    </div>
                                    <div>
                                        <CustomLink position="" onClick={() => setActiveTab('signup')} href='' state={true}>Create an account here</CustomLink>.
                                    </div>
                                </div>
                            </form>
                        )
                        : (
                            <form className='w-full'>
                                <div className='w-full my-4 lg:my-6 px-2 lg:px-12 flex flex-col gap-4'>
                                    <div className='w-full flex gap-4'>
                                        <div className="w-full relative">
                                            <input type="text" name="firstname" id="firstname" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                            <label htmlFor="firstname" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">first name</label>
                                        </div>
                                        <div className="w-full relative">
                                            <input type="text" name="lastname" id="lastname" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                            <label htmlFor="lastname" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">last name</label>
                                        </div>
                                    </div>
                                    <div className="relative w-full">
                                        <input type="email" name="email" id="email" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="email" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                                    </div>
                                    <div className="relative w-full">
                                        <input type="password" name="password" id="password" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="password" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                                    </div>
                                    <div className="relative w-full">
                                        <input type="password" name="cpassword" id="cpassword" className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="cpassword" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">confirm password</label>
                                    </div>
                                </div>
                                <div className="w-full my-6 lg:my-10 text-center">
                                    Already a member? <CustomLink position="" onClick={() => setActiveTab('signin')} href='' state={true}>Login here</CustomLink>.
                                </div>
                                <CustomButton position='w-full py-3'>sign up</CustomButton>
                            </form>
                        )
                }
            </div>
        </div>
    </div>
  )
}

export default Login