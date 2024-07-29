import { LinkSimpleHorizontal } from '@phosphor-icons/react/dist/ssr/LinkSimpleHorizontal'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface Props {
    src: string;
    description?: string;
    owner: string;
    title: string;
    children?: React.ReactNode;
    className?: string;
}

const ProductCard = (props: Props) => {
    const { src, title, description, owner, children, className } = props;
    return (
        <div className={cn('w-full p-4 card-shadow rounded-xl bg-background hover:bg-secondary/50 transition-all ', className)}>
            <div className="w-full mb-4">
                <AspectRatio ratio={286 / 150}>
                    <Image
                        src={src}
                        alt="Blog Image"
                        fill
                        className="object-cover rounded-lg border border-border"
                    />
                </AspectRatio>
            </div>
            <div className="flex flex-col gap-1 mt-4 text-primary">
                <Link href={''} className="text-sm flex items-center gap-2 leading-tight hover:underline cursor-pointer">
                    <Avatar className='w-4 h-4'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='leading-none'>{owner}</span>
                </Link>
                <Link href='/blogs/detail' className="text-lg font-semibold hover:underline cursor-pointer">{title}</Link>
                <p className="text-sm leading-normal">{description}</p>
            </div>
            {children}
        </div>
    )
}

export default ProductCard