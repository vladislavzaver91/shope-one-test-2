'use client';

import { getProductById } from '@/app/utils/db';
import ProductItem from '@/components/product/ProductItem';
// import ProductPopularSlider from '@/components/product/ProductPopularSlider';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductPage({
  params: promiseParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchParamsAndProduct = async () => {
      try {
        // Разворачиваем params с использованием Promise
        const { id } = await promiseParams;
        setId(id);

        const decodedId = decodeURIComponent(id);
        const fetchedProduct = await getProductById(decodedId);

        if (!fetchedProduct) {
          router.replace('/404');
          return;
        }

        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchParamsAndProduct();
  }, [promiseParams, router]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container">
      <h1>Product ID: {id}</h1>
      <ProductItem product={product} />
      {/* <ProductPopularSlider /> */}
    </div>
  );
}
