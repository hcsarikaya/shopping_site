import ProductCard from '@/components/ProductCard'
import React from 'react'
const Products = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products',{
        cache:'no-store'
    });
    const products = await res.json();
    console.log(products)
    return (
        <div className="flex sm:flex-row flex-col items-start  gap-4 lg:gap-6 mx-auto">
            <div className="flex-1 flex flex-col gap-4 lg:gap-6 w-full">
                {products.slice(0, Math.ceil(products.length / 2)).map((product, i) => (
                    <ProductCard
                        key={i}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        owner={product.owner}
                        src={product.coverpic}
                        link={product.link}
                        upvotesNum={product.upvotesNum}
                        reviewsNum={product.reviewsNum}
                    />
                ))}
            </div>
            <div className="flex-1 flex flex-col gap-4 lg:gap-6 w-full">
                {products.slice(Math.ceil(products.length / 2)).map((product, i) => (
                    <ProductCard
                        key={i}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        owner={product.owner}
                        src={product.coverpic}
                        link={product.link}
                        upvotesNum={product.upvotesNum}
                        reviewsNum={product.reviewsNum}
                    />
                ))}
            </div>
        </div>
    )
}

export default Products