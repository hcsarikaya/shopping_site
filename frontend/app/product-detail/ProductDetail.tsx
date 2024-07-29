"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import React, { useState , useEffect} from 'react'
import { ProductType } from './[productId]/ProductDetailPage'
const imgs = [
    '/images/aceternity.png',
    '/images/harmony.png',
    '/images/macos.png',
    '/images/mulligan.png'
]
const ProductDetail = ({ product }: { product: ProductType }) => {
    const [selectedImage, setSelectedImage] = useState(1);
    const [images, setImages] = useState<string[]>([])
    useEffect(() => {
        const productImages = [
            product?.detpic1,
            product?.detpic2,
            product?.detpic3,
            product?.detpic4,
        ].filter(image => image != null);

        setImages(productImages);
    }, [product]);
    return (
        <div className=''>
            <div className='p-4 flex items-start gap-3'>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={`http://localhost:8080/images/${product.owner}.jpg`} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <div className='text-primary font-medium mb-0.5'>{product.owner}</div>
                    <div className='text-sm text-primary mb-1 font-light'>{product.date}</div>
                    <p className='text-primary'>{product.ldescription}</p>
                    <div className='group relative mt-4'>
                        <AspectRatio ratio={286 / 150} className="w-full h-auto">
                            <Image
                                src={images[selectedImage]}
                                alt="Photo by Drew Beamer"
                                fill
                                className="rounded-lg object-cover"
                            />
                        </AspectRatio>
                        <div className='max-w-[1080px] group-hover:opacity-100 xl:opacity-20 transition-all xl:absolute xl:bottom-2 2xl:bottom-5 w-full mt-3 xl:mt-0 xl:w-[85%] 2xl:w-[60%] xl:left-1/2 xl:-translate-x-1/2 flex items-center gap-2 xl:gap-3'>
                            {images.map((val, i) => (
                                <div key={i} onClick={() => setSelectedImage(i)} data-selected={i === selectedImage} className='max-h-[100px] flex-1 data-[selected=true]:scale-110 data-[selected=true]:shadow-xl xl:data-[selected=true]:border-mainly/70 xl:border-2 xl:border-transparent shadow-sm border-transparent rounded-md active:scale-95 cursor-pointer hover:scale-105 transition-all overflow-hidden'>
                                    <AspectRatio ratio={286 / 150} className="w-full h-full">
                                        <Image
                                            src={val}
                                            alt="Photo by Drew Beamer"
                                            fill
                                            className="object-cover"
                                        />
                                    </AspectRatio>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductDetail