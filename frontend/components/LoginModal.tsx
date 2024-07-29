import React from 'react'
import ProductBaseLogo from './ProductBaseLogo'
import Link from 'next/link'

const LoginModal = () => {
    return (
        <div className='rounded-2xl card-shadow py-8 px-6 lg:p-10 bg-background max-w-[400px] min-w-[300px]'>
            <ProductBaseLogo />
            <div className='mt-3 mb-5 font-semibold text-primary'>Sign in to ProductBase</div>
            <div className='flex flex-col gap-3'>
                <div className='text-primary flex flex-col gap-1'>
                    <label htmlFor='login_email' className='text-xs font-semibold'>Email</label>
                    <input id='login_email' placeholder='Email' type='email' className='px-2 py-1.5 bg-secondary rounded-md border placeholder:text-primary/75 text-primary text-sm outline-none ring-0 transition-all focus:ring-offset-1 focus:ring-1 ring-primary' />
                </div>
                <div className='text-primary flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                    <label htmlFor='login_pass' className='text-xs font-semibold'>Password</label>
                    <a href='#' className='text-mainly text-xs font-medium hover:underline'>Forgot your password?</a>
                    </div>
                    <input id='login_pass' placeholder='Password' type='password' className='px-2 py-1.5 bg-secondary rounded-md border placeholder:text-primary/75 text-primary text-sm outline-none ring-0 transition-all focus:ring-offset-1 focus:ring-1 ring-primary' />
                </div>
                <button className='bg-primary px-2 py-2 rounded-md text-secondary text-sm'>Log in</button>
                <div className='text-xs font-medium'>
                    Don’t have an account? <Link href='/auth/register' className='text-mainly hover:underline'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginModal