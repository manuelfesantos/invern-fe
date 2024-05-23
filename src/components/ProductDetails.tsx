import React from 'react'
import ProductComponents from './ProductComponents';
import { CustomLink } from './CustomComponents';
import { IProductDetails } from '@/types/store/product'
import { productDetailsToProduct } from '@/utils/productDetailsToProduct';
import { getCollections } from '@/utils/getFromDb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faPinterestP, faTumblr } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const ProductDetails = async ({product}:{product:IProductDetails}) => {
  const collections = await getCollections()
  const collection = collections.find(item => item.collectionName === product.collectionName)

  return (
    <div className='h-full w-full flex flex-col justify-between'>
      <ProductComponents product={productDetailsToProduct(product)} component={'productDetails'}>
        <div className='h-24  overflow-scroll'>
          <p className='px-4'>{product.description}</p>
        </div>
        <div className='my-2'>
          <hr />
        </div>
        <h4>This product belongs to the <CustomLink position='' href={`/shop/collections/${collection?.collectionId}`}>{product.collectionName}</CustomLink> collection.</h4>
        <div className='flex items-center justify-between'>
          <div className='flex gap-4 px-2'>
            <Link href='' className="icon-scale"><FontAwesomeIcon icon={faInstagram} size='lg' /></Link>
            <Link href='' className="icon-scale"><FontAwesomeIcon icon={faTwitter} size='lg' /></Link>
            <Link href='' className="icon-scale"><FontAwesomeIcon icon={faPinterestP} size='lg' /></Link>
            <Link href='' className="icon-scale"><FontAwesomeIcon icon={faTumblr} size='lg' /></Link>
          </div>
          <div className='flex flex-col text-right'>
            <CustomLink position='' href='/faq/#payment'>About payments</CustomLink>
            <CustomLink position='' href='/faq/#returns'>Returns policy</CustomLink>
            <CustomLink position='' href='/faq/#shipping'>Shipping policy</CustomLink>
          </div>
        </div>
      </ProductComponents>
    </div>
  )
}

export default ProductDetails