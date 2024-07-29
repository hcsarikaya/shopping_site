"use client"
import BlogsCreate from '@/app/blogs/create/page'
import ProductDropdownMenu from '@/app/product-detail/ProductDropdownMenu'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { truncateString } from '@/lib/utils'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface BlogEditProps {
    blog_image: string;
    blog_title: string;
    blog_text: string;
}

const UserBlogBlock = (props: BlogEditProps) => {
    const {toast}=useToast();
    const { data: session } = useSession();
    const [isEdit, setIsEdit] = useState(false);
    const { blog_image, blog_title, blog_text } = props;
    const [blogDataState, setBlogDataState] = useState({
        blog_image, blog_title, blog_text
    })
    const handleEdit = (data:BlogEditProps) => {
        setIsEdit(false)
        setBlogDataState(data)
        toast({
            title: "Your blog has been edited.",
            description: "Completed successfully!",
          })
    }
    return (
        <div className='relative flex items-start xl:flex-row flex-col gap-4'>
            <div className='w-full lg:w-[220px]'>
                <AspectRatio ratio={286 / 150}>
                    <Image
                        src={blogDataState.blog_image}
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-lg object-cover border"
                    />
                </AspectRatio>
            </div>
            <div className='relative flex-1'>
                <Link href='#' className='inline-flex items-center gap-2 text-primary hover:underline'>
                    <span className='font-medium'>{blogDataState.blog_title}</span>
                    <span><ArrowUpRight size={16} /></span>
                </Link>
                <div className='font-light text-primary text-xs'>28.03.2024</div>
                <div className='text-sm text-primary mt-1'>
                    {truncateString(blogDataState.blog_text, 400)}
                </div>
                <ProductDropdownMenu
                    conditionForEditDelete={session?.user.username === 'john_doe'}
                    editFunction={()=>setIsEdit(true)}
                />
            </div>
            <Dialog open={isEdit} onOpenChange={(open) => setIsEdit(open)}>
                <DialogContent className="sm:max-w-[680px] max-h-[96vh] overflow-auto py-0 px-4 rounded-lg">
                    <div className="">
                        <BlogsCreate
                            isEdit
                            onEdit={(data)=>handleEdit(data)}
                            onCancel={() => setIsEdit(false)}
                            blog_image={blogDataState.blog_image}
                            blog_text={blogDataState.blog_text}
                            blog_title={blogDataState.blog_title}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export type {BlogEditProps}
export default UserBlogBlock