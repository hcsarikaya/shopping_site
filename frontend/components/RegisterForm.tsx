"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductBaseLogo from './ProductBaseLogo'
import Link from 'next/link'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { BellSimpleRinging } from "@phosphor-icons/react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Check } from '@phosphor-icons/react/dist/ssr'
import { X } from '@phosphor-icons/react/dist/ssr/X'

const registerScheme = z.object({
    email: z
        .string().trim()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z
        .string().trim()
        .min(1, { message: "This field has to be filled." }),
    fullName: z.string().trim().min(3, { message: 'Full name must be at least 3.' }).max(20, { message: 'Full name must be at most 20.' }),
    username: z.string().trim()
        .min(5, { message: "Username must be at least 5." })
        .max(16, { message: 'Username must be at most 16.' })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message:
                "Username can only contain letters, numbers or underscores.",
        })
        .refine(async (e) => {
            // database'de username kontrolü
            return true
        }, "Username is not available.")
});
const RegisterForm = () => {
    const [usernameFocus, setUsernameFocus] = useState(false);
    const form = useForm<z.infer<typeof registerScheme>>({
        resolver: zodResolver(registerScheme),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            username: ''
        },
    })

    const [registerError, setRegisterError] = useState<string | null>(null);


    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof registerScheme>) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem("authToken", token);
            router.push("/auth/login"); 
          } else {
            const errorData = await response.json();
            setRegisterError(errorData.error || "Registration failed");
          }
        } catch (error) {
          setRegisterError('An error occurred during registration');
        }

      };
    
    

    return (
        <div className='rounded-2xl card-shadow py-8 px-6 lg:p-10 bg-background w-[96%] sm:w-[400px] min-w-[300px]'>
            <ProductBaseLogo />
            <div className='mt-3 mb-5 font-semibold text-primary'>Create an account</div>
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
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel asChild>
                                    <div className='flex items-center justify-between'>
                                        <span>Username</span>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip open={usernameFocus} onOpenChange={(val) => setUsernameFocus((val))}>
                                                <TooltipTrigger asChild>
                                                    <InfoCircledIcon className='w-4 h-4' />
                                                </TooltipTrigger>
                                                <TooltipContent side='top' sideOffset={12} asChild>
                                                    <div className='flex flex-col gap-2 py-2.5'>
                                                        <div className='flex items-center gap-2'>
                                                            <span>{!(field.value.length >= 3) ? <X size={16} weight='bold' className='text-red-500' /> : <Check size={16} weight='bold' className='text-green-500' />}</span>
                                                            <span className='flex-1'>At least 3 characters</span>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <span>{!(field.value.length >= 3 && field.value.length <= 16) ? <X size={16} weight='bold' className='text-red-500' /> : <Check size={16} weight='bold' className='text-green-500' />}</span>
                                                            <span className='flex-1'>At most 16 characters</span>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <span>{!(/^[a-zA-Z0-9_]+$/.test(field.value)) ? <X size={16} weight='bold' className='text-red-500' /> : <Check size={16} weight='bold' className='text-green-500' />}</span>
                                                            <span className='flex-1'>Can contain letters, numbers or underscores.</span>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </FormLabel>
                                <FormControl onBlur={() => setUsernameFocus(false)}>
                                    <Input placeholder="johndoe" onFocus={() => setUsernameFocus(true)} type='text' {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {registerError && (
                        <div className="bg-secondary px-4 py-2.5 rounded-lg flex items-start gap-2 text-primary">
                        <BellSimpleRinging size={16} className="mt-0.5" /> 
                        <p className="text-sm">{registerError}</p>
                        </div>
                    )}
                    <Button type='submit' className='w-full bg-primary px-2 py-2 rounded-md text-secondary text-sm'>Sign up</Button>
                    <div className='text-xs font-medium text-center text-primary/90'>
                        Already have an account <Link href='/auth/login' className='text-mainly hover:underline'>Sign in</Link>
                    </div>
                </form>
            </Form>
        </div>
    )

    
}

export default RegisterForm