import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col'>
        <div className='text-right text-sm pr-2 pb-2'>
            <p>© 2024 Copyright Invern</p>
        </div>
        <form>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="search" className="w-screen p-2 ps-10 text-md text-white bg-[#4C4B48] border border-white focus:outline-none rounded-md" placeholder="search..." required autoComplete="off"/>
                <button type="submit" className="text-white absolute end-0 bottom-0 bg-[#201F1D] hover:bg-blue-800 border border-white focus:outline-none text-md px-4 py-2 rounded-md">search</button>
            </div>
        </form>
    </footer>
  )
}

export default Footer