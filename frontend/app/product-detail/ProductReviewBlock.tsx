"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import ProductDropdownMenu from './ProductDropdownMenu'
import InputBlock from '@/components/InputBlock'
import { useToast } from '@/components/ui/use-toast'

interface Props {
    handleDelete: (id: string) => void,
    product_id: string;
    reviewData: {
        review_id: string;
        username: string;
        name: string;
        image?: string;
        reivew_text: string;
        date?: string;
        showTypeIndicator?: boolean;
    }
}

const ProductReviewBlock = ({ reviewData, handleDelete, product_id }: Props) => {
    const { toast } = useToast()
    const { data: session } = useSession();
    const [reviewDataState, setReviewDataState] = useState<Props["reviewData"]>(reviewData)
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = async (data: { text: string, image: string }) => {
        setReviewDataState((prev) => ({ ...prev, reivew_text: data.text, image: data.image }))
        setIsEditing(false)
        toast({
            title: "Your review has been edited.",
            description: "Completed successfully.",
        })
        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/reviews/update/' + reviewData.review_id, {
            method: 'POST',
            body: JSON.stringify({
                content:data.text
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    const handleCancel = (data: { text: string, image: string }) => {
        setReviewDataState((prev) => ({ ...prev, reivew_text: data.text, image: data.image }))
        setIsEditing(false)
    }
    return (
        isEditing ? <div>
            <InputBlock
                value={reviewDataState.reivew_text}
                onChange={(val) => setReviewDataState((prev) => ({ ...prev, reivew_text: val }))}
                onChangeImage={(val) => setReviewDataState((prev) => ({ ...prev, image: val }))}
                image={reviewDataState?.image}

                isEdit
                onSend={(data) => handleEdit(data)}
                onCancel={(data) => handleCancel(data)}
                placeholder='Edit your thoughts' />
        </div> :
            <div className='relative flex items-start gap-2 lg:gap-3'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='text-primary'>
                    <div className=' text-sm font-medium mb-1 inline-flex items-center gap-1.5'>
                        {reviewDataState.name}
                        <Link href='#' className='font-light hover:underline'>@{reviewDataState.username}</Link>
                        {reviewDataState.showTypeIndicator && <div className='bg-mainly/10 border-[0.5px] border-mainly rounded-md px-1.5 py-1 leading-none text-mainly w-fit text-xs font-medium ml-1'>Review</div>}
                    </div>
                    <div className='text-xs font-light mb-2'>{reviewDataState.date}</div>
                    <p className='text-sm mb-3'>{reviewDataState.reivew_text}</p>
                    {reviewDataState?.image && <Dialog>
                        <DialogTrigger asChild>
                            <div className='w-[150px] h-[80px] border rounded-lg cursor-pointer active:scale-100 transition-all shadow-sm hover:scale-105'>
                                <Image width={0} height={0} loading='lazy' className="w-full h-full object-cover rounded-lg border border-border" sizes="100vw" src={reviewDataState.image} alt="Product Image" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className='text-left'>Review by @{reviewDataState.username}</DialogTitle>
                            </DialogHeader>
                            <AspectRatio ratio={150 / 80} className="bg-muted">
                                <Image width={0} height={0} loading='lazy' className="w-full h-full object-cover rounded-lg border border-border" sizes="100vw" src={reviewDataState.image} alt="Product Image" />
                            </AspectRatio>
                        </DialogContent>
                    </Dialog>}
                </div>
                <ProductDropdownMenu
                    conditionForEditDelete={session?.user.username === reviewDataState.username}
                    editFunction={() => setIsEditing(true)}
                    deleteFunction={() => handleDelete(reviewData.review_id)}
                />
            </div>
    )
}

export default ProductReviewBlock