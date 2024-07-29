import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import React from 'react'

const BlogsDetail = () => {

    return (
        <div className="py-10 lg:py-20 max-w-[660px] w-full mx-auto">
            <AspectRatio ratio={600 / 300} className="rounded-xl border">
                <Image
                    src="/images/mulligan.png"
                    alt="Photo by Drew Beamer"
                    fill
                    priority={true}
                    className="rounded-xl object-cover"
                />
            </AspectRatio>
            <div className='flex items-center gap-2 my-4'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='text-primary hover:underline leading-none'>@abeltesfaye</div>
            </div>
            <h2 className='text-2xl font-semibold text-primary'>Blog posts by Ryan Mulligan</h2>
            <div className='text-primary/75 mt-2 mb-3'>December 04, 2022</div>
            <div className='flex flex-col gap-5 text-primary'>
                <p>In today&apos;s digital era, websites have become the face of any business or organization. They not only represent your brand but also serve as a platform for your customers to interact with you. Therefore, it&apos;s essential to ensure that your website is fast, responsive, and provides a seamless user experience.</p>
                <p>Website speed is a crucial factor that can make or break your online presence. Slow-loading websites can lead to high bounce rates, reduced engagement, and ultimately, loss of revenue. Fortunately, there are several techniques available that can help you optimize your website speed. In this article, I will walk through you these techniques - Preload, Prefetch, Preconnect, and DNS Prefetch with providing examples and best practices for using them to optimize the performance of a website.</p>
                <p>Preload is a technique that allows you to preload resources on your website before they are needed. It helps to reduce the time taken to load a page by preloading critical resources such as CSS, JavaScript, and images. When a user visits your website, the preloaded resources are already in their browser cache, reducing the load time significantly.</p>
                <p>Preload is a technique that allows you to preload resources on your website before they are needed. It helps to reduce the time taken to load a page by preloading critical resources such as CSS, JavaScript, and images. When a user visits your website, the preloaded resources are already in their browser cache, reducing the load time significantly.</p>
            </div>
        </div>
    )
}

export default BlogsDetail