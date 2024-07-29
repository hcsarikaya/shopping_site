"use client"
import ProductQABlock from '@/app/product-detail/ProductQABlock'
import ProductReviewBlock from '@/app/product-detail/ProductReviewBlock'
import React , {useEffect}from 'react'
import { useSession } from 'next-auth/react'
const UserActivity = () => {
    const {data:session}=useSession()
    useEffect(()=>{
        console.log(session)
    },[session])
    return (
        <div className='flex flex-col gap-8'>
            <ProductQABlock
                qaData={{
                    showTypeIndicator: true,
                    username: 'john_doe',
                    name: 'Abel Tesfaye',
                    reivew_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    answer_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    answer_username:'john_doe'
                }}
            />
            <ProductReviewBlock
                reviewData={{
                    showTypeIndicator:true,
                    username: 'john_doe',
                    name: 'Abel Tesfaye',
                    reivew_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                }}
            />
        </div>
    )
}

export default UserActivity