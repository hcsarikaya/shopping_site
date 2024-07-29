"use client"
import ProductReviewBlock from './ProductReviewBlock'
import InputBlock from '@/components/InputBlock'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
const ProductReviews = ({ id }: { id: string }) => {
    const { data: session } = useSession();
    const [thoughts, setThoughts] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const getReviews = async () => {
            try {
                const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/reviews/product/' + id, {
                    cache: 'no-store'
                })
                const res = await req.json();
                console.log(res)
                setReviews(res);
            } catch (e) {

            }
        }
        getReviews()
    }, [id])
    const handleDelete = async (id: any) => {
        try {
            const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/reviews/delete/' + id, {
                method: 'DELETE'
            })
            setReviews(prev => prev.filter((p) => (p.id != id)));
        } catch (e) {

        }
    }
    const handleSend = async (data: any) => {
        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/reviews/' + session?.user.username + '/' + id, {
            method: 'POST',
            body: JSON.stringify({
                content: data.text,
                photoURI: data.image
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await req.json();
        console.log("resss",res)
        setReviews(prev=>([...prev,res]))
    }
    return (
        <div className='relative flex-1 flex flex-col gap-4 w-full'>
            <InputBlock
                value={thoughts}
                placeholder='Write your thoughts'
                onChange={(val) => setThoughts(val)}
                acceptImage
                onChangeImage={(val) => setSelectedImage(val)}
                onSend={(data) => handleSend(data)}
            />
            {
                reviews.map((rev, i) => (
                    <ProductReviewBlock
                        key={i}
                        handleDelete={handleDelete}
                        product_id={id}
                        reviewData={{
                            review_id: rev.id,
                            username: rev.username,
                            date: rev?.date,
                            name: rev.name,
                            image: '' ?? rev.photoURI,
                            reivew_text: rev.content
                        }}
                    />
                ))
            }
        </div>
    )
}

export default ProductReviews