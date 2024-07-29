"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
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
import { useRouter } from 'next/navigation';
interface Props {
    blogUsername: string;
    blogId: string;
}

const BlogEdit = ({ blogUsername, blogId }: Props) => {
    const { data: session } = useSession();
    const router = useRouter();
    if (session?.user.username != blogUsername) {
        return null;
    }

    const handleDelete = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/blogs/delete/' + blogId)
        const deleted = await res.json();
        
    }
    return (
        <div className="flex items-center justify-end gap-2 mb-4">
            <button className='bg-secondary border border-border hover:border-primary px-3 py-1.5 rounded-lg text-sm active:scale-95 font-medium text-primary hover:bg-primary hover:text-secondary transition-all'>
                Edit
            </button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className='bg-secondary border border-border hover:border-primary px-3 py-1.5 rounded-lg text-sm active:scale-95 font-medium text-primary hover:bg-primary hover:text-secondary transition-all'>
                        Delete
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this blog
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default BlogEdit