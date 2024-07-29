import { LinkSimpleHorizontal } from '@phosphor-icons/react/dist/ssr/LinkSimpleHorizontal'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface Props {
    id: string;
    src: string;
    reviewsNum?: string;
    category?: string;
    description?: string;
    upvotesNum?: number;
    owner: string;
    title: string;
    link: string;
    children?: React.ReactNode;
    className?: string;
}

const ProductCard = (props: Props) => {
    const { id, src, title, link, reviewsNum, category, description, upvotesNum, owner, children, className } = props;
    return (
        <div className={cn('w-full p-4 card-shadow rounded-xl bg-background hover:bg-secondary/50 transition-all', className)}>
            <div className="w-full mb-4">
                <AspectRatio ratio={286 / 150}>
                    <Image
                        src={src}
                        alt="Product Image"
                        fill
                        className="object-cover rounded-lg border border-border"
                    />
                </AspectRatio>
            </div>
            <div className="flex flex-col gap-1 mt-4 text-primary">
                <Link href={'/merchant/' + owner} className="text-xs leading-tight hover:underline cursor-pointer">{owner}</Link>
                <Link href={'/product-detail/' + id} className="text-lg font-semibold hover:underline cursor-pointer">{title}</Link>
                {/^http(s?):\/\//i.test(link) && <Link href={link} target='_blank' className="group flex items-center gap-1 cursor-pointer">
                    <LinkSimpleHorizontal size={16} />
                    <span className="group-hover:underline text-sm leading-tight w-fit">{link?.replace(/^http(s?):\/\//i, "") ?? link}</span>
                </Link>}
                <p className="text-sm leading-normal">{description}</p>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                    <div className="px-1 py-0.5 h-6 rounded-md flex items-center gap-1 bg-mainly/5 text-mainly border-[0.5px] border-mainly">
                        <Star size={14} weight="fill" />
                        <span className="text-xs leading-none">{upvotesNum ?? 0}</span>
                    </div>
                    {!!category && <div className="px-1 py-0.5 h-6 rounded-md flex items-center gap-1 bg-pinky/5 text-pinky border-[0.5px] border-pinky">
                        <span className="text-xs leading-none">{category}</span>
                    </div>}
                    <div className="px-1 py-0.5 h-6 rounded-md flex items-center gap-1 bg-secondary text-primary border-[0.5px] border-primary/10">
                        <span className="text-xs leading-none">{reviewsNum} reviews</span>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default ProductCard