"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { truncateString } from '@/lib/utils'
import { ArrowUpRight, DotsThree } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import UserBlogBlock from './UserBlogBlock'

interface Props {
    username: string;
}
const UserBlogs = ({ username }: Props) => {
    const { data: session } = useSession();
    

    return (
        <div className='flex flex-col gap-8'>
            {Array(5).fill(null).map((_, i) => (
                <UserBlogBlock key={i}
                    blog_image='/images/typefully.png'
                    blog_title='Noor - Chat for teams'
                    blog_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
                />
            ))}
        </div>
    )
}

export default UserBlogs