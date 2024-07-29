"use client"
import ProductBookmarkBlock from '@/app/product-detail/ProductBookmarkBlock'
import ProductMerhantBlock from '@/app/product-detail/ProductMerhantBlock'
import React, { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
interface Props {
  username: string;
}
interface ProductType {
  id: string;
  link: string;
  title: string;
  category: string;
  description: string;
  ldescription: string;
  username: string;
  coverImage: string;
  det1: string;
  det2: string;
  det3: string;
  det4: string;
  owner: string;
  type: string;
  coverpic: string;
  upvotesNum: number;
  reviewsNum: number;
}
const UserProducts = ({ username }: Props) => {
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductType[]>([])
  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/merchant/' + username, {
        method: 'GET',
        cache: 'no-store'
      });
      const res = await req.json();
      setProducts(res)
    }
    getProducts();
  }, [username])
  const handleDelete = async (id: string) => {
    const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    toast({
      title: "Your product has been deleted.",
      description: "Completed succesfully!",
    })
    setProducts((prev) => prev.filter((data) => data.id !== id))
  }
  return (
    <div className='flex flex-col gap-8'>
      {products.length === 0 && <div className='text-lg mt-2 text-primary font-medium'>There are no products yet.</div>}
      {products?.map((data, i) => (
        <ProductMerhantBlock
          handleDelete={handleDelete}
          key={i}
          id={data.id}
          merchant={data.owner}
          image={data.coverpic}
          title={data.title}
          link={data.link}
          short_description={data.description}
          long_description={data.ldescription}
          category={{
            value: data.type,
          }}
          upvotesNum={data.upvotesNum}
          reviewsNum={data.reviewsNum}
        />
      ))}

      {/* <ProductMerhantBlock
        merchant='john_doe'
        image='/images/typefully.png'
        title='Noor - Chat for teams'
        link=''
        short_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        long_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        category={{
          value: 'workproductivity',
        }}
        upvotesNum={882}
        reviewsNum={100}

      />
      <ProductMerhantBlock
        merchant='john_doe'
        image='/images/typefully.png'
        title='Noor - Chat for teams'
        link=''
        short_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        long_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        category={{
          value: 'workproductivity',
        }}
        upvotesNum={882}
        reviewsNum={100}

      />
      <ProductMerhantBlock
        merchant='john_doe'
        image='/images/typefully.png'
        title='Noor - Chat for teams'
        link=''
        short_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        long_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        category={{
          value: 'workproductivity',
        }}
        upvotesNum={882}
        reviewsNum={100}

      /> */}
    </div>
  )
}

export default UserProducts