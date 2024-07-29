"use client"
import { PaperPlaneTilt, X } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image'
import { cn } from '@/lib/utils'

interface SendingOptions {
    text: string;
    image: string;
}
interface Props {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onChangeImage?: (image: string) => void;
    acceptImage?: boolean;
    image?: string;
    className?: string;
    onSend?: (data: SendingOptions) => void;
    onCancel?: (data: SendingOptions) => void;
    isEdit?: boolean;
}


const InputBlock = ({ className, value, placeholder, image, onSend,onCancel, onChange, onChangeImage, acceptImage = false, isEdit = false }: Props) => {
    const { data: session } = useSession();
    const [firstValue,setFirstValue]=useState(value);
    const [firstImage,setFirstImage]=useState(image);
    const [selectedImage, setSelectedImage] = useState(image ?? '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [value]);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!acceptImage || !onChangeImage) {
            return;
        }
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result as string;
                setSelectedImage(result);
                onChangeImage(result);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSend = () => {
        if (!onSend) return;
        const data = {
            text: textareaRef.current?.value || '',
            image: selectedImage || ''
        }
        onSend(data)
    }
    const handleCancel = () => {
        if (!onCancel) return;
        const data = {
            text: firstValue || '',
            image: firstImage || ''
        }
        onCancel(data)
    }
    return (
        <div className={cn('relative pb-4 border-b flex items-start gap-2 lg:gap-3', className)}>
            {!session && <div className='flex items-center justify-center opacity-0 hover:opacity-100 transition-all bg-secondary/50 absolute top-0 left-0 w-full h-full z-50'>
                <Link href={'/auth/login'} className='bg-primary px-4 py-1.5 rounded-lg text-secondary font-medium'>Log in</Link>
            </div>}

            {session ? <Avatar className='h-8 w-8'>
                {session.user?.image && <AvatarImage src={session.user?.image} alt="@shadcn" />}
                <AvatarFallback>CN</AvatarFallback>
            </Avatar> :
                <div className='w-8 h-8 rounded-full bg-secondary'>

                </div>
            }
            <div className='flex-1 flex flex-col gap-3'>
                <textarea ref={textareaRef} maxLength={500} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className='w-full max-h-60 min-h-20 outline-none overflow-auto text-primary placeholder:text-primary/60 resize-none pr-1 bg-transparent'></textarea>
                {(selectedImage && acceptImage) && <div className='group relative mt-1 w-[150px] h-[80px] border rounded-lg cursor-pointer active:scale-100 transition-all'>
                    <button onClick={() => setSelectedImage('')} className='opacity-100 lg:opacity-0 group-hover:opacity-100 absolute top-2 right-2 w-6 h-6 bg-white/75 text-black/75 rounded-full flex items-center justify-center transition-all'>
                        <X size={14} weight='bold' />
                    </button>
                    <Image width={0} height={0} loading='lazy' className="w-full h-full object-cover rounded-lg border border-border" sizes="100vw" src={selectedImage} alt="Product Image" />
                </div>}
                <div className='h-[1px] w-full bg-border'></div>
                <div className='flex items-center justify-between gap-3'>
                    {acceptImage ? <div className='flex-1'>
                        {!selectedImage && <>
                            <input
                                className='hidden'
                                type="file"
                                accept="image/png, image/jpeg"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <button onClick={() => fileInputRef.current?.click()} className='inline-flex gap-1 items-center justify-center bg-secondary border border-border rounded-lg text-primary h-8 w-8 hover:bg-primary/10 active:scale-95 transition-all'>
                                <ImageIcon />
                            </button>
                        </>}
                    </div> : <div></div>}
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-pinky/5 text-pinky'>
                            <span className={`${value.length > 100 ? 'block opacity-100' : 'hidden opacity-0'} transition-all text-sm`}>{value.length > 100 && value.length}</span>
                        </div>

                        {isEdit ?
                            <div className='flex items-center gap-2'>
                                <button onClick={handleCancel} disabled={!value.trim()} className='disabled:opacity-50 disabled:pointer-events-none inline-flex gap-1 items-center bg-primary/5 border border-primary/20 rounded-lg text-primary px-2 py-1 h-8 hover:bg-primary/15 active:scale-95 transition-all'>
                                    <span className='text-sm leading-none px-1'>Cancel</span>
                                </button>
                                <button onClick={handleSend} disabled={!value.trim()} className='disabled:opacity-50 disabled:pointer-events-none inline-flex gap-1 items-center bg-mainly/5 border border-mainly rounded-lg text-mainly px-2 py-1 h-8 hover:bg-mainly/15 active:scale-95 transition-all'>
                                    <span className='text-sm leading-none px-1'>Edit</span>
                                </button>
                            </div> :
                            <button onClick={handleSend} disabled={!value.trim()} className='disabled:opacity-50 disabled:pointer-events-none inline-flex gap-1 items-center bg-mainly/5 border border-mainly rounded-lg text-mainly px-2 py-1 h-8 hover:bg-mainly/15 active:scale-95 transition-all'>
                                <PaperPlaneTilt size={16} />
                                <span className='text-sm leading-none'>Send</span>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputBlock