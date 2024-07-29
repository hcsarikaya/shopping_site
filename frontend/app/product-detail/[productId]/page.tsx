import React from 'react'
import ProductDetailPage from './ProductDetailPage'
import { notFound } from 'next/navigation'
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  if (!params.productId) {
    notFound()
  }
  const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/' + params.productId,{
    cache:'no-store'
  })
  const res = await req.json();
  console.log(res)
  if (!res || res?.error) {
    notFound()
  }
  return (
    <ProductDetailPage product={res} />
  )
}

export default ProductPage