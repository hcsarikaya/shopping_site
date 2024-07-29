"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { X } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import React, { ChangeEvent, useRef, useState } from 'react'

interface Props {
    onChangeImage: (image: string, uploadedImage: File | undefined) => void;
    image?: string;
}

const SubmitImageUploader = ({ onChangeImage, image }: Props) => {
    const [selectedImage, setSelectedImage] = useState(image ?? '');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target?.result) return;
                setSelectedImage(e.target.result as string);
                onChangeImage(e.target.result as string, file)
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='w-full'>
            <AspectRatio ratio={286 / 150} className='relative rounded-lg border bg-secondary'>
                {selectedImage ?
                    <>
                        <Image
                            src={selectedImage}
                            alt="Photo by Drew Beamer"
                            fill
                            className="rounded-lg object-cover "
                        />
                        <Button type='button' onClick={() => { setSelectedImage(''); onChangeImage('',undefined) }} className='absolute top-3 right-3 rounded-full' variant={'outline'} size={'icon'}><X size={20} /></Button>
                    </>
                    :
                    <>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            className='hidden top-0 left-0 absolute'
                            onChange={handleImageChange}
                        />
                        <div className='absolute mt-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                            <Button type='button' onClick={handleButtonClick} variant={'outline'} >Upload Image</Button>
                            <div className='text-xs font-medium text-primary/75 mt-2 '>Only PNG or JPG</div>
                        </div>
                    </>
                }
            </AspectRatio>

        </div>
    )
}

export default SubmitImageUploader