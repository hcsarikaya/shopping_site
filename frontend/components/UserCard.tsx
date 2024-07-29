import Link from 'next/link';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { LinkSimpleBreak } from '@phosphor-icons/react/dist/ssr';
import { LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import ChangePasswordForm from './ChangePasswordForm';
import { useSession } from 'next-auth/react';

interface Props {
    src?: string;
    description?: string;
    username: string;
    name: string;
    profilePic?:string;
    children?: React.ReactNode;
    className?: string;
    email: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
    token?:string
}

const UserCard = (props: Props) => {
    const { data: session, status } = useSession();
    const { src,
        description,
        name,
        email,
        username,
        profilePic,
        children,
        className,
        twitter = '',
        linkedin = '',
        website = '',
        token = '' } = props;

    if (status === 'loading') {
        return (
            <div className={cn('w-full h-96 animate-pulse p-4 flex flex-col gap-3 card-shadow rounded-xl bg-background hover:bg-secondary/50 transition-all relative ', className)}></div>
        )
    }
    return (
        <div className={cn('overflow-hidden w-full card-shadow rounded-xl bg-background hover:bg-secondary/50 transition-all relative ', className)}>
            <div className=''>
                <div className='bg-secondary w-full h-24 -mb-16'></div>
            </div>
            <div className='relative p-4 flex flex-col gap-4'>
                <Avatar className='w-24 h-24 rounded-full border shadow-sm'>
                    <AvatarImage src={profilePic} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5 text-primary mt-2">
                    <Link href={''} className="text-sm flex items-center gap-2 leading-tight hover:underline cursor-pointer">@{username}</Link>
                    <div className='text-lg font-semibold'>{name}</div>
                    <div className='text-sm'>{description}</div>
                </div>
                {(website || twitter || linkedin) && <>
                    <div className='w-full h-[1px] bg-border'></div>
                    <div className='text-primary'>
                        <div className='text-sm font-medium'>Links</div>
                        <div className='mt-2 text-sm flex flex-wrap items-center gap-3'>
                            {website && <Link href={website} target='_blank' className='w-9 h-9 rounded-full bg-secondary flex items-center justify-center border hover:bg-primary/10 transition-all active:scale-95'>
                                <LinkSimpleBreak size={18} />
                            </Link>}
                            {twitter && <Link href={'https://x.com/' + twitter} target='_blank' className='w-9 h-9 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center border border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/15 transition-all active:scale-95'>
                                <TwitterLogoIcon className='w-[18px] h-[18px] text-[#1DA1F2]' />
                            </Link>}
                            {linkedin && <Link href={'https://www.linkedin.com/in/' + linkedin} target='_blank' className='w-9 h-9 rounded-full bg-[#0077b5]/5 flex items-center justify-center border border-[#0077b5]/30 hover:bg-[#0077b5]/10 transition-all active:scale-95'>
                                <LinkedInLogoIcon className='w-[18px] h-[18px] text-[#0077b5]' />
                            </Link>}
                        </div>
                    </div>
                </>}
                {children}
            </div>
        </div >
    )
}

export default UserCard