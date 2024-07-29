"use client"
import ProductReview from './ProductReviewBlock'
import InputBlock from '@/components/InputBlock'
import { useState } from 'react'
import ProductQABlock from './ProductQABlock'

const ProductQAs = () => {
    const [thoughts, setThoughts] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    return (
        <div className='relative flex-1 flex flex-col gap-4 w-full'>
            <InputBlock
                value={thoughts}
                placeholder='Write your question'
                onChange={(val) => setThoughts(val)}
                acceptImage
                onChangeImage={(val) => setSelectedImage(val)}
            />
            {
                Array(5).fill(null).map((_, i) => (
                    <ProductQABlock
                        key={i}
                        qaData={{
                            username: 'mike_jones',
                            name: 'Abel Tesfaye',
                            reivew_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            answer_text :'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            answer_username:'john_doe',
                            image:'/images/noor.png',
                        }}
                    />
                ))
            }
        </div>
    )
}

export default ProductQAs