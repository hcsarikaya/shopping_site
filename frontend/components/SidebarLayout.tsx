"use client"
import { Article } from '@phosphor-icons/react/dist/ssr/Article';
import { ChatsTeardrop } from '@phosphor-icons/react/dist/ssr/ChatsTeardrop';
import { House } from '@phosphor-icons/react/dist/ssr/House';
import { Storefront } from '@phosphor-icons/react/dist/ssr/Storefront';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DotsThreeVertical } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import ProductBaseLogo from './ProductBaseLogo';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { Asterisk, BookmarkSimple, Fire, SignOut, User, UserCircle , Ticket} from '@phosphor-icons/react/dist/ssr';
const sidebarNavs = [
    {
        icon: <House size={18} />,
        title: 'Home',
        route: '/',
    },
    {
        icon: <Storefront size={18} />,
        title: 'Products',
        route: '/products',
    },
    {
        icon: <Article size={18} />,
        title: 'Blogs',
        route: '/blogs',
    },
    {
        icon: <ChatsTeardrop size={18} />,
        title: 'Community',
        route: '/community',
    },
];

const userProfileDetailNavs = [
    {
        icon: <UserCircle size={18} />,
        title: 'Profile',
        route: (username: string, role: string) => {
            return '/' + role + '/' + username
        },
    },
    {
        icon: <Article size={18} />,
        title: 'Blogs',
        route: (username: string, role: string) => {
            return '/' + role + '/' + username + '/?activeTab=blogs'
        },
        visible:'user'
    },
    {
        icon: <BookmarkSimple size={18} />,
        title: 'Bookmarks',
        route: (username: string, role: string) => {
            return '/' + role + '/' + username + '/?activeTab=bookmarks'
        },
        visible:'user'
    },
];

export default function SidebarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [openProfileDetail, setOpenProfileDetail] = useState(false);
    const expandedProfileDetailRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: any) => {
        if (expandedProfileDetailRef.current && !expandedProfileDetailRef.current.contains(event.target)) {
            setOpenProfileDetail(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='lg:flex h-[100vh]'>
            <div className='w-[288px] h-[100dvh] overflow-auto bg-primary-foreground border-r border-border px-3 py-6 hidden lg:flex flex-col justify-between'>
                <nav className='flex flex-col gap-6 flex-1 overflow-auto'>
                    <Link href='/' className='cursor-pointer ml-1'>
                        <ProductBaseLogo />
                    </Link>
                    {session?.user.role === 'admin' && <>
                        <div className='w-full h-[1px] bg-border'></div>
                        <Link href='/admin' className={`flex items-center gap-2 w-full border border-transparent hover:border-mainly/50 hover:bg-mainly/10 transition-all active:scale-95 text-mainly p-2 text-sm font-medium rounded-lg ${pathname === '/submit' ? 'border-mainly/50 bg-mainly/10' : ''}`}>
                            <Ticket size={18} weight='bold' />
                            <span>Admin</span>
                        </Link>
                    </>}
                    <ul className='flex flex-col gap-1 '>
                        {sidebarNavs.map((data, i) => (
                            <li key={i} className={`select-none w-full p-2 rounded-lg active:scale-95 border border-transparent text-primary transition-all cursor-pointer 
                            ${data.route === pathname ? 'bg-primary text-secondary' : 'bg-transparent hover:bg-primary/5 hover:border-border'}`}>
                                <Link href={data.route} className='flex items-center gap-2'>
                                    <span>{data.icon}</span>
                                    <span className='text-sm'>{data.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {session?.user.role === 'merchant' && <>
                        <div className='w-full h-[1px] bg-border'></div>
                        <Link href='/submit' className={`flex items-center gap-2 w-full border border-transparent hover:border-mainly/50 hover:bg-mainly/10 transition-all active:scale-95 text-mainly p-2 text-sm font-medium rounded-lg ${pathname === '/submit' ? 'border-mainly/50 bg-mainly/10' : ''}`}>
                            <Fire size={18} weight='bold' />
                            <span>Submit</span>
                        </Link>
                    </>}
                </nav>
                {session ?
                    <div ref={expandedProfileDetailRef} className={`${openProfileDetail && 'bg-primary/5 px-2.5 py-2 rounded-lg border'} transition-all`}>
                        <div onClick={() => setOpenProfileDetail(!openProfileDetail)} className='select-none flex items-center justify-between cursor-pointer p-2 rounded-lg active:scale-95 hover:bg-primary/5 transition-all border border-transparent hover:border-border'>
                            <div className='flex items-center gap-2'>
                                <Avatar className='w-10 h-10'>
                                    {session?.user?.image && <AvatarImage src={session.user?.image} className='object-cover' />}
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='text-sm'>
                                    <div className='font-semibold text-primary mb-0.5'>{session.user?.name}</div>
                                    <div className='text-primary/70'>@{session.user?.username}</div>
                                </div>
                            </div>
                            <DotsThreeVertical size={20} className='opacity-30' weight='bold' />
                        </div>
                        <div className={`flex flex-col gap-0.5 overflow-hidden border-t mt-2 pt-2 transition-all duration-500 ${openProfileDetail ? 'max-h-96' : 'h-fit -mb-6 max-h-0 opacity-0'}`}>
                            {userProfileDetailNavs.map((val, i) => (
                                val.visible ?
                                (val.visible ===session?.user.role ?<Link key={i} href={val.route(session.user.username, session.user.role)} onClick={() => setOpenProfileDetail(false)} className='flex items-center gap-2 text-primary text-sm hover:bg-primary/5 px-2.5 py-2 rounded-md transition-all'>
                                    <span>{val.icon}</span>
                                    <span className='leading-4'>{val.title}</span>
                                </Link>:'')
                                :<Link key={i} href={val.route(session.user.username, session.user.role)} onClick={() => setOpenProfileDetail(false)} className='flex items-center gap-2 text-primary text-sm hover:bg-primary/5 px-2.5 py-2 rounded-md transition-all'>
                                    <span>{val.icon}</span>
                                    <span className='leading-4'>{val.title}</span>
                                </Link>
                            ))}
                            <div onClick={() => signOut({ callbackUrl: '/auth/login' })} className='flex items-center gap-2 text-primary text-sm hover:bg-primary/5 px-2.5 py-2 rounded-md transition-all cursor-pointer'>
                                <span><SignOut size={18} /></span>
                                <span className='leading-4'>Logout</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='w-[90%] mx-auto text-center flex items-center gap-2'>
                        <Link href={'/auth/login'}
                            className='px-4 py-2 rounded-lg active:scale-95 hover:bg-primary/5 transition-all text-sm font-medium border border-transparent hover:border-border'
                        >Login</Link>
                        <Link href={'/auth/register'}
                            className='flex-1 p-2 rounded-lg active:scale-95 bg-primary text-secondary hover:bg-primary/90 text-sm font-medium transition-all border border-transparent hover:border-border'
                        >Register</Link>
                    </div>}
            </div>
            <div className='flex border-b lg:hidden h-12 px-4'>
                <div className='max-w-[660px] w-full mx-auto flex items-center justify-between'>
                    <Link href='/' className='cursor-pointer ml-1 h-[20px] [&>svg]:h-full'>
                        <ProductBaseLogo />
                    </Link>
                    <div className='text-primary'>
                        <Drawer >
                            <DrawerTrigger className='flex items-center justify-center' asChild>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-12.69,88L136,60.69V48h12.69L208,107.32V120ZM136,83.31,172.69,120H136Zm72,1.38L171.31,48H208ZM120,48v72H48V48ZM107.31,208,48,148.69V136H60.69L120,195.31V208ZM120,172.69,83.31,136H120Zm-72-1.38L84.69,208H48ZM208,208H136V136h72v72Z"></path></svg>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className='px-3 py-6 flex flex-col justify-between'>
                                    <nav className='flex flex-col gap-6 flex-1 overflow-auto min-h-[300px]'>
                                        <ul className='flex flex-col gap-1 '>
                                            {sidebarNavs.map((data, i) => (
                                                <li key={i} className={`select-none w-full p-2 rounded-lg active:scale-95 border border-transparent text-primary transition-all cursor-pointer 
                            ${data.route === pathname ? 'bg-primary text-secondary' : 'bg-transparent hover:bg-primary/5 hover:border-border'}`}>
                                                    <Link href={data.route} className='flex items-center gap-2'>
                                                        <span>{data.icon}</span>
                                                        <span className='text-sm'>{data.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                    {session ?
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className='select-none flex items-center justify-between cursor-pointer p-2 rounded-lg active:scale-95 hover:bg-primary/5 transition-all border border-transparent hover:border-border'>
                                                    <div className='flex items-center gap-2'>
                                                        <Avatar className='w-10 h-10'>
                                                            {session?.user?.image && <AvatarImage src={session.user?.image} />}
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <div className='text-sm'>
                                                            <div className='font-semibold text-primary mb-0.5'>{session.user?.name}</div>
                                                            <div className='text-primary/70'>@{session.user?.email}</div>
                                                        </div>
                                                    </div>
                                                    <DotsThreeVertical size={20} className='opacity-30' weight='bold' />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='w-[258px]'>
                                                <DropdownMenuItem >
                                                    <User size={16} className='mr-2' />
                                                    <span>Profile</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/auth/login' })}>
                                                    <SignOut size={16} className='mr-2' />
                                                    <span>Logout</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        :
                                        <div className='w-[90%] mx-auto text-center flex items-center gap-4'>
                                            <Link href={'/auth/login'}
                                                className='p-2 rounded-lg active:scale-95 hover:bg-primary/5 transition-all text-sm font-medium border border-transparent hover:border-border'
                                            >Login</Link>
                                            <Link href={'/auth/register'}
                                                className='flex-1 p-2 rounded-lg active:scale-95 bg-primary text-secondary hover:bg-primary/90 text-sm font-medium transition-all border border-transparent hover:border-border'
                                            >Register</Link>
                                        </div>}
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
            <div className='flex-1 px-4 lg:px-0 lg:h-[100dvh] lg:overflow-auto'>
                {children}
            </div>
        </div>
    );
}