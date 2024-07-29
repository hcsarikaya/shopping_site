'use client'

import React, {useEffect, useState} from "react";
import AdminItem from "@/components/AdminItem";
import "./admin-page.css"
import NothingHere from "@/components/NothingHere";

interface Product {
    src: string;
    reviewsNum?: string;
    category?: string;
    description?: string;
    upvotesNum?: string;
    owner: string;
    title: string;
    link: string;
    children?: React.ReactNode;
    className?: string;
    id: number;
}

interface User {
    id: number;
    email: string,
    name: string,
    username: string
}

interface Blog {
    title: string,
    blog_text: string,
    date: string,
    photoURI: string
    username: string
    name: string
    email: string
    id: number
}

interface Merchant {
    id: number,
    photoURI: string,
    email: string,
    name: string
}


const AdminPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [merchants, setMerchants] = useState<Merchant[]>([]);


    const fetchItems = async () => {
        try {
            const responseProducts = await fetch('/api/products/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await responseProducts.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
        try {
            const responseUsers = await fetch('/api/users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataUsers = await responseUsers.json();
            setUsers(dataUsers);
        } catch (error) {
            console.log(error);
        }

        try {
            const responseMerchants = await fetch('/api/merchants/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataMerchants = await responseMerchants.json();
            setMerchants(dataMerchants);
        } catch (error) {
            console.log(error);
        }

        try {
            const responseBlogs = await fetch('/api/blogs/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataBlogs = await responseBlogs.json();
            setBlogs(dataBlogs);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: number, name: string) => {
        const body = id; //"/api/products"
        try {
            const response = await fetch(`/api/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({body})
            });
            return response.status;
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteButton = async (id: number, endpoint: string, frontArray: any[]) => {
        const items: any[] = frontArray.slice(0);
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                const status = await handleDelete(id, endpoint);
                if (status === 200) {
                    items.splice(i, 1);
                    switch (endpoint) {
                        case "products": {
                            setProducts(items);
                            break;
                        }
                        case "users": {
                            setUsers(items);
                            break;
                        }
                        case "blogs": {
                            setBlogs(items);
                            break;
                        }
                        case "merchants": {
                            setMerchants(items);
                            break;
                        }
                    }
                    console.log("deleted");
                    console.log(items);
                }
                return;
            }
        }
    }


    return (
        <div className="admin-page">
            <div className="horizontal-container">
                <div className="category">
                    {/*PRODUCTS*/}
                    <div className="outer">
                        <div className="inner-items">
                            <h2 className="headers">PRODUCTS</h2>
                            <div className="inner-category">
                                {products.length ? products.map((product) => (
                                    <AdminItem key={product.id} id={product.id} title={product.title}
                                               handleDelete={handleDeleteButton} array={products}
                                               endpoint="products"></AdminItem>
                                )) : <NothingHere/>}
                            </div>
                        </div>
                    </div>
                    <div className="outer">
                        <div className="inner-items">
                            <h2 className="headers">USERS</h2>
                            <div className="inner-category">
                                {users.length ? users.map((user: User) => (
                                    <AdminItem key={user.id} id={user.id} title={user.username}
                                               handleDelete={handleDeleteButton} array={users} endpoint="users"></AdminItem>
                                )) : <NothingHere/>}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="category">
                    {/*PRODUCTS*/}
                    <div className="outer">
                        <div className="inner-items">
                            <h2 className="headers">BLOGS</h2>
                            <div className="inner-category">
                                {blogs.length ? blogs.map((blog) => (
                                    <AdminItem key={blog.id} id={blog.id} title={blog.title}
                                               handleDelete={handleDeleteButton} array={blogs} endpoint="blogs"></AdminItem>
                                ))  : <NothingHere/>}

                            </div>
                        </div>
                    </div>
                    <div className="outer">
                        <div className="inner-items">
                            <h2 className="headers">MERCHANTS</h2>
                            <div className="inner-category">
                                {merchants.length ? merchants.map((merchant: Merchant) => (
                                    <AdminItem key={merchant.id} id={merchant.id} title={merchant.name}
                                               handleDelete={handleDeleteButton} array={merchants}
                                               endpoint="merchant"></AdminItem>
                                )) : <NothingHere/>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AdminPage;