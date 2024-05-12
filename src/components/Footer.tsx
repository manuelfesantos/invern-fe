import React from 'react'
import Button from './Button'

const Footer = () => {
  return (
    <footer className='flex flex-col'>
        <div className='text-right pr-2 pb-2'>
            <p className='p2'>© 2024 copyright Invern</p>
        </div>
        <form className='z-20'>
            <div className="relative h-10">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="search" className="h-full w-screen pl-14 bg-opacity-70 bg-[#4C4B48] focus:outline-none" placeholder="search..." required autoComplete="off"/>
                <Button position="absolute h-full end-0 px-6">search</Button>
            </div>
        </form>
    </footer>
  )
}

export default Footer