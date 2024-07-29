"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ArrowUpRight, BookmarkSimple, Star } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ProductBookmarkBlock = () => {
    const { toast } = useToast()
    const [bookmarked, setBookmarked] = useState(true);
    const handleProductBookmark = () => {
        if (!bookmarked) {
            toast({
                title: 'Saved to bookmarks!',
                description: "Completed successfully.",
            })
            setBookmarked(true);
            return;
        }
        toast({
            title: 'Removed from bookmarks!',
            description: "Completed successfully.",
        })
        setBookmarked(false);
    }
    return (
        <div className='relative flex items-start xl:flex-row flex-col gap-4'>
            <div className='w-full lg:w-[220px]'>
                <AspectRatio ratio={286 / 150}>
                    <Image
                        src={'/images/typefully.png'}
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-lg object-cover border"
                    />
                    <Button onClick={handleProductBookmark} variant="outline" size="icon" className='rounded-full absolute bottom-2 right-2 shadow-md text-primary active:scale-90 transition-all'>
                        <BookmarkSimple size={20} weight={bookmarked ? 'fill' : 'regular'} />
                    </Button>
                </AspectRatio>
            </div>
            <div className='relative flex-1'>
                <Link href='#' className='inline-flex items-center gap-2 text-primary hover:underline'>
                    <span className='font-medium'>Noor - Chat for teams</span>
                    <span><ArrowUpRight size={16} /></span>
                </Link>
                <div className='font-light text-primary text-xs'>28.03.2024</div>
                <div className='text-sm text-primary mt-1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?
                </div>
                <div className='mt-2 flex items-center flex-wrap gap-2'>
                    <div className='bg-pinky/10 border-[0.5px] border-pinky rounded-md px-1.5 py-1 leading-none mb-1 text-pinky w-fit text-xs font-medium'>Productivity</div>
                    <div className='bg-mainly/10 border-[0.5px] inline-flex items-center gap-1 border-mainly rounded-md px-1.5 py-1 leading-none mb-1 text-mainly w-fit text-xs font-medium'>
                        <Star size={12} weight="fill" />
                        882
                    </div>
                    <div className='bg-secondary border-[0.5px] border-border rounded-md px-1.5 py-1 leading-none mb-1 text-primary w-fit text-xs font-medium'>100 reviews</div>
                </div>
            </div>
        </div>
    )
}

export default ProductBookmarkBlock