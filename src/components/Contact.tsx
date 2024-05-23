'use client'
import React from 'react'
import { CustomButton } from './CustomComponents'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const Contact = () => {

    const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            subject:'',
            message:''
        },
        onSubmit: () => {
            formik.resetForm()
        },
        validationSchema: Yup.object({
            name:Yup.string().required('Required.'),
            email:Yup.string().email('Please insert a valid email.').required('Required.'),
            subject:Yup.string().required('Required.'),
            message:Yup.string().required('Required.'),
        })
    })

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-full w-full lg:h-[550px] lg:w-[500px] flex flex-col items-center justify-center px-12 lg:px-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow overflow-scroll">
                <div className='my-2'>
                <h3 className="p-4 border-b-2">
                        Contact Us
                </h3>
                </div>
                <div className='w-full'>
                <form className='w-full' onSubmit={formik.handleSubmit}>
                    <div className='w-full my-6 lg:my-8 px-6 lg:px-12 flex flex-col gap-4'>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
                            { formik.touched.name && formik.errors.name && <div className='error'>{formik.errors.name}</div> }
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                            { formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div> }
                        </div>
                        <div className="relative mb-2">
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                onChange={formik.handleChange}
                                value={formik.values.subject}
                                className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " />
                            <label htmlFor="subject" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">subject</label>
                            { formik.touched.subject && formik.errors.subject && <div className='error'>{formik.errors.subject}</div> }
                        </div>
                        <div className="relative mb-2">
                            <textarea
                                name="message"
                                id="message"
                                onChange={formik.handleChange}
                                value={formik.values.message}
                                className="block py-6 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " />
                            <label htmlFor="message" className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">message</label>
                            { formik.touched.message && formik.errors.message && <div className='error'>{formik.errors.message}</div> }
                        </div>
                        <CustomButton position='w-full py-3' type='submit'>submit</CustomButton>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Contact