"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserDetailType } from './UserDetail'
import _ from 'lodash';
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ChangePasswordForm from '@/components/ChangePasswordForm'
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
import { Textarea } from '@/components/ui/textarea'
import { useSession } from 'next-auth/react'
import { useToast } from "@/components/ui/use-toast"
const formSchema = z.object({
    name: z.string().trim().min(3, { message: 'Full name must be at least 3.' }).max(20, { message: 'Full name must be at most 20.' }),
    description: z.string().trim().max(150, { message: 'Bio must be at most 150 characters.' }),
    twitter: z.string().optional().refine(value => !value || !/(https?:\/\/[^\s]+)/g.test(value), {
        message: "Just enter your Twitter username."
    }),
    linkedin: z.string().optional().refine(value => !value || !/(https?:\/\/[^\s]+)/g.test(value), {
        message: "Just enter your Linkedin username."
    }),
    website: z.string().optional().refine(value => !value || /(https?:\/\/[^\s]+)/g.test(value), {
        message: "Just enter your website link."
    }),
})

interface EditProfileFormProps {
    userDetail: UserDetailType;
    setUserDetail: React.Dispatch<React.SetStateAction<UserDetailType>>;
}
const EditProfileForm: React.FC<EditProfileFormProps> = ({ userDetail, setUserDetail }) => {
    const { toast } = useToast()
    const { data: session, update } = useSession();
    const [selectedImage, setSelectedImage] = useState(userDetail.imgname);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userDetail?.name,
            description: userDetail?.description,
            twitter: userDetail?.twitter,
            website: userDetail?.website,
            linkedin: userDetail?.linkedin,
        },
    })
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedImage(URL.createObjectURL(files[0]));
            setUploadedImage(files[0]);
        }
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (uploadedImage) {
                formData.append('image', uploadedImage);
            } else {
                formData.append('image', '');
            }
            console.log(formData)
            const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/'+(session?.user.role+'s')+'/updateim/' + session?.user.username, {
                method: 'POST',
                body: formData
            })
            const res = await req.json();
            console.log(res)
            if (!res.error) {
                toast({
                    title: "Your profile has been edited.",
                    description: "Completed successfully.",
                })
                setUserDetail(prev => ({ ...prev, ...values, imgname: selectedImage }))
                update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: values.name,
                    }
                })
            } else {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem.",
                    variant: "destructive"
                })
            }

        } catch (e) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem.",
                variant: "destructive"
            })
        }
    }

    return (
        <div className='max-w-[520px]'>
            <div className='text-xl font-semibold mt-1.5 mb-6'>Edit your profile</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@mail.com" readOnly value={userDetail.email} />
                        </FormControl>
                        <FormDescription>
                            Email cannot be changed.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Can be a minimum of 3 and a maximum of 20 characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        {selectedImage && <div className='relative overflow-hidden w-24 h-24 my-2 rounded-full border'>
                            <Image fill src={selectedImage} alt='Not found' />
                        </div>}
                        <FormControl>
                            <Input type='file' accept="image/png, image/jpeg" onChange={handleFileChange} />
                        </FormControl>
                        <FormDescription>
                            Only PNG or JPG file is accepted.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website link</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter username</FormLabel>
                                <FormControl>
                                    <Input placeholder="example" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Just &quot;example&quot; from twitter.com/example.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Linkedin username</FormLabel>
                                <FormControl>
                                    <Input placeholder="example" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Just &quot;example&quot; from linkedin.com/in/example/.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biography</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='I am a ...' spellCheck={false} rows={8} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Can be a maximum of 150 characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save changes</Button>
                </form>
            </Form>
            <div className='w-full h-[1px] bg-border my-8'></div>
            <div className='flex flex-col gap-4'>
                <Dialog >
                    <DialogTrigger asChild>
                        <Button variant={'outline'} className='min-w-40 w-fit'>Change password</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Change your password</DialogTitle>
                        </DialogHeader>
                        <div className="">
                            <ChangePasswordForm />
                        </div>
                    </DialogContent>
                </Dialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={'destructive'} className='w-fit min-w-40'>Delete account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </div>
    )
}

export default EditProfileForm