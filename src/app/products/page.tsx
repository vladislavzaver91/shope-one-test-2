"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ProductList = dynamic(() => import("@/components/home/ProductList"), {
  ssr: false,
});
const Filters = dynamic(() => import("@/components/home/Filters"), {
  ssr: false,
});

export default function Products() {
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    price: "",
    sort: "",
  });

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Cart */}

        {/* Filters and Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters onFilter={handleFilter} />
          </div>
          <div className="lg:col-span-3">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </main>
  );
}
