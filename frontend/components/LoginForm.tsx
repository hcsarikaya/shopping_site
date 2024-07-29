"use client"
import React, { useState } from 'react'
import ProductBaseLogo from './ProductBaseLogo'
import Link from 'next/link'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { BellSimpleRinging } from '@phosphor-icons/react/dist/ssr';
import { signIn } from 'next-auth/react';

const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z
        .string()
        .min(1, { message: "This field has to be filled." }),
});

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const response = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        console.log(response)
        if(response?.error){
            setError('Please check your email or password.')
            return;
        }

        if(response?.ok){
            
            router.push('/')
        }
    }

    return (
        <div className='rounded-2xl card-shadow py-8 px-6 lg:p-10 bg-background w-[96%] sm:w-[400px] min-w-[300px]'>
            <ProductBaseLogo />
            <div className='mt-3 mb-5 font-semibold text-primary'>Sign in to ProductBase</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@mail.com" type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel asChild className='w-full flex items-center justify-between'>
                                    <div className='flex items-center justify-between'>
                                        <span>Password</span>
                                        <Link href='#' className='text-mainly text-xs font-medium hover:underline'>Forgot your password?</Link>
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <div className='bg-secondary px-4 py-2.5 rounded-lg flex items-start gap-2 text-primary'>
                        <BellSimpleRinging size={16} className='mt-0.5' />
                        <p className='text-sm'>{error}</p>
                    </div>}
                    <Button type='submit' className='w-full bg-primary px-2 py-2 rounded-md text-secondary text-sm'>Log in</Button>
                    <div className='text-xs font-medium text-primary/90'>
                        Don’t have an account? <Link href='/auth/register' className='text-mainly hover:underline'>Sign up</Link>
                    </div>
                </form>
            </Form>
        </div>

    )
}

export default LoginForm