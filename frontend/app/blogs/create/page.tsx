"use client"
import {AspectRatio} from '@/components/ui/aspect-ratio'
import {CloudArrowUp} from '@phosphor-icons/react/dist/ssr/CloudArrowUp'
import {X} from '@phosphor-icons/react/dist/ssr/X'
import Image from 'next/image'
import React, {useRef, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const BlogsCreate = () => {
    const router = useRouter()
    const {data: session} = useSession();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [realText, setRealText] = useState('');
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleImageChange(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageChange(file);
        }
    };

    const handleImageChange = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setSelectedImage(result);
        };
        reader.readAsDataURL(file);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            setRealText(realText + '\n');
            console.log(realText)
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        setRealText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handlePublish = async () => {
        if (session?.user.username == undefined){
            alert("PLEASE LOG-IN FIRST!");
            return;
        }


        const body = JSON.stringify({
            blog_text: text,
            title: title,
            username: session?.user.username
        })

        const res = await fetch('/api/blogs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        console.log(res);
        const respond = await res.json();
        router.push('/blogs')
        console.log(respond);
    }
        return (
            <div className="relative py-2 lg:py-10 max-w-[660px] w-full mx-auto">
                <div className='z-20 flex items-center justify-between bg-background sticky top-0 py-3 lg:py-4'>
                    <h2 className='text-xl font-semibold text-primary'>Create a blog</h2>
                    <button onClick={handlePublish}
                            className='text-mainly rounded-full px-3 py-1 border border-mainly bg-mainly/5 hover:bg-mainly/10 transition-all active:scale-95 font-medium'>Publish
                    </button>
                </div>
                <AspectRatio ratio={600 / 300} className="bg-muted rounded-xl border mt-2">
                    {selectedImage ?
                        <div className='w-full h-full relative'>
                            <button onClick={() => setSelectedImage('')}
                                    className='absolute z-20 top-2 lg:top-4 right-2 lg:right-4 w-8 h-8 bg-white/75 hover:bg-white transition-all text-black/75 rounded-full flex items-center justify-center'>
                                <X size={18} weight='bold'/>
                            </button>
                            <Image
                                src={selectedImage}
                                alt="Photo by Drew Beamer"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                        : <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className='rounded-xl w-full h-full bg-secondary flex flex-col items-center justify-center gap-2 lg:gap-3'>
                            <input
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                ref={fileInputRef}
                                onChange={handleFileInputChange}
                            />
                            <CloudArrowUp size={36} weight='thin' className='text-primary opacity-80'/>
                            <div className='text-base lg:text-lg text-primary/75 font-medium'>Drag & Drop Image</div>
                            <div className='flex items-center gap-2 w-1/2 lg:w-1/4'>
                                <div className='h-[1px] flex-1 bg-primary/10'></div>
                                <div className='text-sm text-primary/50 font-medium'>or</div>
                                <div className='h-[1px] flex-1 bg-primary/10'></div>
                            </div>
                            <button onClick={handleButtonClick}
                                    className='bg-background lg:text-base text-sm border-primary/10 border px-2 py-1 rounded-lg hover:bg-primary/5 transition-all active:scale-95'>Upload
                                Image
                            </button>
                        </div>
                    }
                </AspectRatio>
                <div className='mt-6 pb-6'>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                           className='w-full placeholder:text-primary/40 text-primary text-2xl outline-none font-medium'
                           placeholder="Enter blog's title"/>
                    <textarea className='relative z-10 w-full outline-none mt-2 resize-none min-h-[560px]'
                              onChange={handleChange}

                              value={text}
                              placeholder='Write something...'></textarea>
                </div>
                <div className='sticky bottom-4 z-30 bg-background w-fit rounded-full'>
                </div>
            </div>
        )
    }

    export default BlogsCreate