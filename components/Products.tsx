'use client'

import { useProduct, useProducts } from '@/services/queries'
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

const Products = () => {
  const productsQuery = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const productQuery = useProduct(selectedProductId);
  return (
    <>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment>
              <button onClick={() =>  setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}

      <br />
      <div>
        <button onClick={() => productsQuery.fetchNextPage()} disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}>
          {productsQuery.isFetchingNextPage ? "Loading More..." : productsQuery.hasNextPage ? "Load More" : "Nothing More to Load"}
        </button>
      </div>

      <div>Selected Product</div>
      {JSON.stringify(productQuery.data)}
    </>
  )
}

export default Products