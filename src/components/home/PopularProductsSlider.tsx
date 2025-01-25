"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import {
  getProductsFromLocalStorage,
  initializeProducts,
} from "@/utils/localStorageProducts";
import { Product } from "@/types";

interface ProductListProps {
  filters: {
    category: string;
    search: string;
    price: string;
    sort: string;
  };
}

const PopularProductsSlider = ({ filters }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    initializeProducts();
    setProducts(getProductsFromLocalStorage());
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          !filters.category || product.category === filters.category;
        const matchesSearch =
          !filters.search ||
          product.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesPrice =
          !filters.price || product.price <= parseFloat(filters.price);
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (filters.sort === "price") {
          return a.price - b.price;
        }
        return 0;
      });
  }, [filters, products]);

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Most Popular Products
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1.5}
        navigation
        pagination={{ clickable: true }}
        className="bg-gray-800 p-4 rounded-lg"
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="max-w-xs max-h-48 mx-auto">
              <Image
                width={10}
                height={10}
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularProductsSlider;
