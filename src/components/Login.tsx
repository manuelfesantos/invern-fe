'use client'
import React, {useCallback, useEffect} from 'react'
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {useSearchParams} from "next/navigation";

const Login = () => {
    const params = useSearchParams()
    const signup = params.get('signup')

    const isSignup = useCallback(() => signup && signup === 'true', [signup])

    useEffect(() => {
        setActiveTab(isSignup() ? 'signup' : 'signin')
    }, [params, isSignup])

    const [activeTab,setActiveTab] = useState( isSignup() ? 'signup' : 'signin')

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
                                <SignIn setActiveTab={setActiveTab} />
                            )
                            : (
                                <SignUp setActiveTab={setActiveTab} />
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login