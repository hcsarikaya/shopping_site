'use client'
import {PencilSimpleLine} from '@phosphor-icons/react/dist/ssr/PencilSimpleLine'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import {useEffect, useState} from "react";

interface Blog {
    src: string;
    description?: string;
    username: string;
    title: string;
    children?: React.ReactNode;
    className?: string;
    id: string;
}


const BlogsPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);


    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blogs");
            const data = await response.json();
            setBlogs(data);


        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <div className="py-10 lg:py-5 max-w-[660px] mx-auto">
            <div className="flex items-center text-primary justify-between w-full mx-auto mb-6">
                <h2 className="text-2xl font-semibold">Blogs</h2>
                <Link href='/blogs/create'
                      className="px-2 py-1 rounded-lg border border-border bg-secondary hover:bg-primary/10 transition-all active:scale-95 inline-flex items-center gap-2">
                    <PencilSimpleLine size={16}/>
                    <span>Write a blog</span>
                </Link>
            </div>

            <div style={{display: "block"}}>
                <div style={{overflowY: "auto", overflowX: "hidden", height: 570}}>
                    {blogs.length ? blogs.map((blog) =>
                            (<BlogCard key={blog.id} src={"/images/macos.png"} owner={blog.username}
                                       title={blog.title}
                                       blogId={blog.id}></BlogCard>)) :
                        <div style={{textAlign: "center", alignContent: "center", height: 400}}>
                            <p style={{fontSize: 30}}> THERES NOTHING HERE...</p>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default BlogsPage