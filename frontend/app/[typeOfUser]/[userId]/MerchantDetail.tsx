"use client"
import ProductCard from '@/components/ProductCard';
import UserCard from '@/components/UserCard';
import { Button } from '@/components/ui/button';
import { Article, BookmarkSimple, Lightning, Storefront } from '@phosphor-icons/react/dist/ssr';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import EditProfileForm from './EditProfileForm';
import UserActivity from './UserActivity';
import UserBookmarks from './UserBookmarks';
import UserBlogs from './UserBlogs';
import { useSearchParams } from 'next/navigation';
import UserProducts from './UserProducts';

const userDetailTabs = [
    {
        id: 'activity',
        title: 'Activity',
        icon: <Lightning size={16} />,
        role: ['user', 'merchant']
    },
    {
        id: 'bookmarks',
        title: 'Bookmarks',
        icon: <BookmarkSimple size={16} />,
        role: ['user']
    },
    {
        id: 'blogs',
        title: 'Blogs',
        icon: <Article size={16} />,
        role: ['user']
    },
    {
        id: 'products',
        title: 'Products',
        icon: <Storefront size={16} />,
        role: ['merchant']
    },
];
interface UserDetailType {
    name: string;
    username: string;
    email: string;
    imgname: string;
    description: string;
    twitter: string;
    website: string;
    linkedin: string;
    
}
const MerchantDetail = ({ typeOfUser, user }: { typeOfUser: string, user: UserDetailType }) => {
    const searchParams = useSearchParams()
    const tabsRef = useRef<HTMLDivElement>(null);
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState('activity');
    const [userDetail, setUserDetail] = useState<UserDetailType>({
        name: user?.name ?? '',
        username: user?.username ?? '',
        email: user?.email ?? '',
        imgname: user?.imgname ?? '',
        description: user?.description ?? '',
        twitter: user?.twitter ?? '',
        website: user?.website ?? '',
        linkedin: user?.linkedin ?? ''
    })
    const handleTabClick = (id: string) => {
        setActiveTab(id);
        tabsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        const search = searchParams.get('activeTab')
        if (!search) {
            setActiveTab('activity')
            return;
        };
        const foundTab = userDetailTabs.find((val) => val.id === search);
        if (foundTab && foundTab.role.includes(typeOfUser)) {
            setActiveTab(search);
        } else {
            setActiveTab('activity')
        }
    }, [searchParams, typeOfUser])

    if (status === 'loading') {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className='pb-12 lg:px-12 lg:pt-0 pt-4 flex lg:flex-row flex-col items-start gap-2 lg:gap-9 max-w-[660px] mx-auto lg:max-w-full'>
            <UserCard
                description={userDetail?.description}
                name={userDetail?.name}
                username={userDetail?.username}
                email={userDetail?.email}
                twitter={userDetail?.twitter}
                linkedin={userDetail?.linkedin}
                website={userDetail?.website}
                profilePic={userDetail?.imgname}
                className='hover:bg-background lg:sticky lg:top-12 lg:mt-12 lg:min-w-[300px] lg:max-w-[360px]'
            >
                {session?.user.token  && <Button onClick={() => handleTabClick('edit')} className='absolute top-[72px] right-2' variant="outline">Edit profile</Button>}
            </UserCard>
            <div className='relative flex-1 flex flex-col gap-4 w-full'>
                <div className='absolute top-0' ref={tabsRef}></div>
                <div className='sticky top-0 pt-4 lg:pt-12 bg-background z-20 flex items-center gap-2 overflow-auto pb-3 border-b'>
                    {userDetailTabs.map((data, i) => (
                        data.role.includes(typeOfUser) ? <button key={data.id}
                            onClick={() => handleTabClick(data.id)}
                            className={`flex whitespace-nowrap items-center gap-2 px-3 py-1.5 transition-all rounded-lg border ${activeTab === data.id ? 'bg-primary border-primary text-secondary' : 'bg-secondary text-primary hover:bg-primary/10'}`}>
                            <span>{data.icon}</span>
                            <span className='text-sm'>{data.title}</span>
                        </button> : null
                    ))}
                </div>
                {activeTab === 'edit' && <EditProfileForm
                    userDetail={userDetail}
                    setUserDetail={setUserDetail}
                />}
                {activeTab === 'activity' && <UserActivity />}
                {activeTab === 'bookmarks' && <UserBookmarks />}
                {activeTab === 'blogs' && <UserBlogs />}
                {activeTab === 'products' && <UserProducts />}
            </div>
        </div>
    )
}

export type { UserDetailType }
export default MerchantDetail
