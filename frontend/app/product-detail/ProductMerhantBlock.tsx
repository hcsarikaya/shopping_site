"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArrowUpRight, Star } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ProductDropdownMenu from './ProductDropdownMenu'
import { useSession } from 'next-auth/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SubmitForm, { SubmitFormData } from '../submit/SubmitForm'
import categories from '@/lib/categories'
import { useToast } from '@/components/ui/use-toast'

interface Props {
    id: string;
    merchant: string;
    image: string;
    title: string;
    link: string;
    short_description: string;
    long_description: string;
    category: { value: string };
    upvotesNum: number;
    reviewsNum: number;
    detailedImages?: string[];
    handleDelete: (id:string)=>void;
}

const ProductMerhantBlock = (props: Props) => {
    const {
        merchant,
        image,
        title,
        link,
        short_description,
        long_description,
        category,
        upvotesNum,
        reviewsNum,
        detailedImages = ['', '', '', ''], handleDelete} = props;
    const { toast } = useToast();
    const { data: session } = useSession();
    const [productDataState, setProductDataState] = useState({
        merchant, image, title, link, short_description, long_description, category, upvotesNum, reviewsNum, detailedImages
    });
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = (formData: SubmitFormData) => {
        console.log(formData)
        setProductDataState(prev => ({
            ...prev,
            image: formData.coverImage,
            title: formData.title,
            link: formData.link,
            short_description: formData.shortDescription,
            long_description: formData.longDescription,
            detailedImages: formData.detailedImages,
            category: { value: formData.category }
        }))
        toast({
            title: "Your product has been edited.",
            description: "Completed succesfully!",
        })
        setIsEdit(false)
    }
    
    return (
        <div className='relative flex items-start xl:flex-row flex-col gap-4'>
            <div className='w-full lg:w-[220px]'>
                <AspectRatio ratio={286 / 150}>
                    <Image
                        src={productDataState.image}
                        alt="Product Image"
                        fill
                        className="rounded-lg object-cover border"
                    />
                </AspectRatio>
            </div>
            <div className='relative flex-1'>
                <Link href={'/products' + props.id} className='inline-flex items-center gap-2 text-primary hover:underline'>
                    <span className='font-medium'>{productDataState.title}</span>
                    <span><ArrowUpRight size={16} /></span>
                </Link>
                <div className='font-light text-primary text-xs'>28.03.2024</div>
                <div className='text-sm text-primary mt-1'>
                    {productDataState.short_description}
                </div>
                <div className='mt-2 flex items-center flex-wrap gap-2'>
                    <div className='bg-pinky/10 border-[0.5px] border-pinky rounded-md px-1.5 py-1 leading-none mb-1 text-pinky w-fit text-xs font-medium capitalize'>{categories.find((ct) => ct.value === productDataState.category.value)?.label}</div>
                    <div className='bg-mainly/10 border-[0.5px] inline-flex items-center gap-1 border-mainly rounded-md px-1.5 py-1 leading-none mb-1 text-mainly w-fit text-xs font-medium'>
                        <Star size={12} weight="fill" />
                        {productDataState.upvotesNum}
                    </div>
                    <div className='bg-secondary border-[0.5px] border-border rounded-md px-1.5 py-1 leading-none mb-1 text-primary w-fit text-xs font-medium'>{productDataState.reviewsNum} reviews</div>
                </div>
                <ProductDropdownMenu
                    conditionForEditDelete={true}
                    editFunction={() => setIsEdit(true)}
                    deleteFunction={()=>handleDelete(props.id)}
                />
            </div>

            <Dialog open={isEdit} onOpenChange={(open) => setIsEdit(open)}>
                <DialogContent className="sm:max-w-[680px] max-h-[96vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Edit product</DialogTitle>
                        <DialogDescription>
                            Make changes to your product here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <SubmitForm
                            isEdit
                            formData={{
                                id: '0',
                                link: productDataState.link,
                                title: productDataState.title,
                                category: productDataState.category.value,
                                shortDescription: productDataState.short_description,
                                longDescription: productDataState.long_description,
                                coverImage: productDataState.image,
                                detailedImages: productDataState.detailedImages,
                            }}
                            onEdit={(formData) => handleEdit(formData)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductMerhantBlock