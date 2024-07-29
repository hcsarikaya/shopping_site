"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsThree } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

interface Props {
    conditionForEditDelete?: boolean;
    editFunction?: () => void;
    deleteFunction?: () => void;
}

const ProductDropdownMenu = (props: Props) => {
    const {
        conditionForEditDelete = false,
        editFunction,
        deleteFunction
    } = props;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='absolute top-2 right-2 bg-primary-foreground w-6 h-6 border rounded-md text-primary flex items-center justify-center hover:bg-primary/10 transition-all'>
                    <DotsThree size={20} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem>Report</DropdownMenuItem>
                {conditionForEditDelete &&
                    <>
                        <DropdownMenuItem onClick={editFunction}>Edit</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger className='text-sm hover:bg-destructive/5 hover:text-destructive transition-all w-full text-left px-2 py-1 rounded-sm'>
                                    Delete
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your review.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteFunction}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProductDropdownMenu