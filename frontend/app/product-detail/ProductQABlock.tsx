"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DotsThree, DotsThreeVertical } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSession } from 'next-auth/react'
import InputBlock from '@/components/InputBlock'
import ProductDropdownMenu from './ProductDropdownMenu'
import { useToast } from '@/components/ui/use-toast'
interface Props {
    qaData: {
        username: string;
        name: string;
        reivew_text: string;
        image?: string;
        date?: string;
        showTypeIndicator?: boolean;
        answer_text: string;
        answer_username: string;
        answer_date?: string;
    }
}
const ProductQABlock = ({ qaData }: Props) => {
    const { toast } = useToast()
    const { data: session } = useSession();
    const [merchAnswer, setMerchAnswer] = useState('');
    const [qaDataState, setQADataState] = useState<Props['qaData']>(qaData)
    const [isEditingQuestion, setIsEditingQuestion] = useState(false);
    const [isEditingAnswer, setIsEditingAnswer] = useState(false);
    const handleEditQuestion = (data: { text: string, image: string }) => {
        setQADataState((prev) => ({ ...prev, reivew_text: data.text, image: data.image }))
        setIsEditingQuestion(false)
        toast({
            title: "Your question has been edited.",
            description: "Completed successfully.",
        })
    }
    const handleEditAnswer = (data: { text: string, image: string }) => {
        setQADataState((prev) => ({ ...prev, answer_text: data.text }))
        setIsEditingAnswer(false)
        toast({
            title: "Your answer has been edited.",
            description: "Completed successfully.",
        })
    }
    const handleCancelAnswer=(data: { text: string, image: string })=>{
        setQADataState((prev) => ({ ...prev, answer_text: data.text }))
        setIsEditingAnswer(false)
    }
    const handleCancelQuestion=(data: { text: string, image: string })=>{
        setQADataState((prev) => ({ ...prev, reivew_text: data.text, image: data.image }))
        setIsEditingQuestion(false)
    }
    return (
        isEditingQuestion ? <div>
            <InputBlock
                value={qaDataState.reivew_text}
                onChange={(val) => setQADataState((prev) => ({ ...prev, reivew_text: val }))}
                onChangeImage={(val) => setQADataState((prev) => ({ ...prev, image: val }))}
                image={qaDataState?.image}
                acceptImage
                isEdit
                onCancel={(data) => handleCancelQuestion(data)}
                onSend={(data) => handleEditQuestion(data)}
                placeholder='Edit your thoughts' />
        </div> :
            <div className='relative flex items-start gap-2 lg:gap-3'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='text-primary'>
                    <div className=' text-sm font-medium mb-1 inline-flex items-center gap-1.5'>
                        {qaDataState.name}
                        <Link href='#' className='font-light hover:underline'>@{qaDataState.username}</Link>
                        {qaDataState.showTypeIndicator && <div className='bg-[#FF3A5E]/10 border-[0.5px] border-[#FF3A5E] rounded-md px-1.5 py-1 leading-none text-[#FF3A5E] w-fit text-xs font-medium ml-1'>Q/A</div>}
                    </div>
                    <div className='text-xs font-light mb-2'>{new Date().toLocaleString()}</div>
                    <div className='text-sm mb-3'>{qaDataState.reivew_text}</div>
                    {qaDataState.image && <Dialog>
                        <DialogTrigger asChild>
                            <div className='w-[150px] h-[80px] border rounded-lg cursor-pointer active:scale-100 transition-all shadow-sm hover:scale-105'>
                                <Image width={0} height={0} loading='lazy' className="w-full h-full object-cover rounded-lg border border-border" sizes="100vw" src={qaDataState.image} alt="Product Image" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className='text-left'>Review by @abeltesfaye</DialogTitle>
                            </DialogHeader>
                            <AspectRatio ratio={150 / 80} className="bg-muted">
                                <Image width={0} height={0} loading='lazy' className="w-full h-full object-cover rounded-lg border border-border" sizes="100vw" src={qaDataState.image} alt="Product Image" />
                            </AspectRatio>
                        </DialogContent>
                    </Dialog>}
                    <div className='mt-3 bg-secondary rounded-lg w-full'>
                        {qaDataState.answer_text || true ? (
                            isEditingAnswer ? <div className='p-2'>
                                <InputBlock
                                    value={qaDataState.answer_text}
                                    onChange={(val) => setQADataState((prev) => ({ ...prev, answer_text: val }))}
                                    isEdit
                                    onSend={(data) => handleEditAnswer(data)}
                                    onCancel={(data) => handleCancelAnswer(data)}
                                    placeholder='Edit your thoughts' />
                            </div> :
                                <div className='relative p-3 flex items-start gap-3'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className='text-sm text-primary font-medium mb-0.5'>Noor Studio</div>
                                        <div className='text-xs text-primary mb-1 font-light'>28.03.2024</div>
                                        <p className='text-sm text-primary'>{qaDataState.answer_text}</p>
                                    </div>
                                    <ProductDropdownMenu
                                        conditionForEditDelete={session?.user.username === qaDataState.answer_username}
                                        editFunction={() => setIsEditingAnswer(true)}
                                    />
                                </div>
                        ) :
                            <div className='px-4 py-3'>
                                <InputBlock
                                    className='border-b-0 pb-0'
                                    placeholder='Write your answer'
                                    value={merchAnswer}
                                    onChange={(val) => setMerchAnswer(val)}
                                />
                            </div>
                        }
                    </div>
                </div>
                <ProductDropdownMenu
                    conditionForEditDelete={session?.user.username === qaDataState.username}
                    editFunction={() => setIsEditingQuestion(true)}
                />
            </div>
    )
}

export default ProductQABlock