import React from 'react'
import ProductBaseLogo from './ProductBaseLogo'
import Link from 'next/link'

const RegisterModal = () => {
    return (
        <div className='rounded-2xl card-shadow py-8 px-6 lg:p-10 bg-background max-w-[400px] min-w-[300px]'>
            <ProductBaseLogo />
            <div className='mt-3 mb-5 font-semibold text-primary'>Sign in to ProductBase</div>
            <div className='flex flex-col gap-3'>
                <div className='text-primary flex flex-col gap-1'>
                    <label htmlFor='register_email' className='text-xs font-semibold'>Email</label>
                    <input id='register_email' placeholder='Email' type='email' className='px-2 py-1.5 bg-secondary rounded-md border placeholder:text-primary/75 text-primary text-sm outline-none ring-0 transition-all focus:ring-offset-1 focus:ring-1 ring-primary' />
                </div>
                <div className='text-primary flex flex-col gap-1'>
                    <label htmlFor='register_full_name' className='text-xs font-semibold'>Full name</label>
                    <input id='register_full_name' placeholder='Full name' type='text' className='px-2 py-1.5 bg-secondary rounded-md border placeholder:text-primary/75 text-primary text-sm outline-none ring-0 transition-all focus:ring-offset-1 focus:ring-1 ring-primary' />
                </div>
                <div className='text-primary flex flex-col gap-1'>
                    <label htmlFor='register_username' className='text-xs font-semibold'>Username</label>
                    <input id='register_username' placeholder='Username' type='text' className='px-2 py-1.5 bg-secondary rounded-md border placeholder:text-primary/75 text-primary text-sm outline-none ring-0 transition-all focus:ring-offset-1 focus:ring-1 ring-primary' />
                </div>
                <div className='text-primary flex flex-col gap-1'>
                    <label htmlFor='register_pass' className='text-xs font-semibold'>Password</label>
                    <input id='register_pass' placeholder='Password' type='password' className='px-2 py-1.5 bg-secondary rounded-md border placeholder:text-primary/75 text-primary text-sm outline-none ring-0 transition-all focus:ring-offset-1 focus:ring-1 ring-primary' />
                </div>
                <button className='bg-primary px-2 py-2 rounded-md text-secondary text-sm'>Sign up</button>
                <div className='text-xs font-medium text-center'>
                    Already have an account <Link href='/auth/login' className='text-mainly hover:underline'>Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal