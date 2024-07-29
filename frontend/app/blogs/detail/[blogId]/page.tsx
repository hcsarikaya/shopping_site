'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import BlogEdit from './BlogEdit'
import {usePathname, useRouter} from "next/navigation";

interface Blog {
    title: string,
    blog_text: string,
    date: string,
    photoURI: string
    username: string
    name: string
    email: string
    id: string
}

const BlogsDetail = () => {
    const [blog, setBlog] = useState<Blog>();
    const fetchUrl = "/api/blogs/byId";
    const path = usePathname().split("/");
    const id = Number(path[path.length-1]);

    const fetchBlog = async (id:number) => {
        const url = fetchUrl + "?id="+id;

        try{
            const res = await fetch(fetchUrl + "?id=" + id);
            const data = await res.json();
            setBlog(data);
        } catch (e){
            console.log(e);
        }
    }
    useEffect(() => {
        fetchBlog(id);
    }, []);

    return (
        <div className="py-10 lg:py-20 max-w-[660px] w-full mx-auto">
            {blog != undefined ? <div>
                <BlogEdit blogUsername={blog.username} blogId={blog.id}/>
                <AspectRatio ratio={600 / 300} className="rounded-xl border">
                    <Image
                        src="/images/mulligan.png"
                        alt="Photo by Drew Beamer"
                        fill
                        priority={true}
                        sizes="(max-width: 100%)"
                        className="rounded-xl object-cover"
                    />
                </AspectRatio>
                <div className='flex items-center gap-2 my-4'>
                    <Avatar className='w-8 h-8'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='text-primary hover:underline leading-none'>@{blog.username}</div>
                </div>
                <h2 className='text-2xl font-semibold text-primary' style={{overflowWrap: "break-word"}}>{blog.title}</h2>
                <div className='text-primary/75 mt-2 mb-3'>{blog.date}</div>
                <div className='flex flex-col gap-5 text-primary'>
                    <p>{blog.blog_text}</p>
                </div>
            </div> : <div>THERES NOTHING HERE</div>}
        </div>
    )
}

export default BlogsDetail