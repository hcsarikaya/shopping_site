import ProductBookmarkBlock from '@/app/product-detail/ProductBookmarkBlock'
import React from 'react'

const UserBookmarks = () => {
  return (
    <div className='flex flex-col gap-8'>
        <ProductBookmarkBlock/>
        <ProductBookmarkBlock/>
        <ProductBookmarkBlock/>
        <ProductBookmarkBlock/>
    </div>
  )
}

export default UserBookmarks