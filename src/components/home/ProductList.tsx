import { Product } from "@/types";
import Pagination from "@mui/material/Pagination";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

interface ProductListProps {
  filters: {
    category: string;
    search: string;
    price: string;
    sort: string;
  };
}

const ProductList = ({ filters }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const productsPerPage = 12;

  // Fetch products from the database
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data.products); // Assuming API returns products in response.data.products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentPageProducts = useMemo(() => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  }, [page, products]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPageProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
