import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Проверяем наличие изображений и используем первое изображение или плейсхолдер
  const imageSrc = product.images.length > 0 ? product.images[0] : "/placeholder.jpg";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="space-y-2 mb-2">
        <div className="relative w-full h-40 aspect-square">
          <Image
            src={`/${imageSrc}.jpg`} // Убедитесь, что путь начинается с /
            alt={product.title}
            fill
            className="w-full object-cover object-center rounded-lg"
          />
        </div>
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-700 font-bold">${product.price}</p>
      </div>

      {/* line */}
      <div className="w-full mb-4 border-t border-gray-300"></div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-500 text-sm">Category:</p>
        <p className="text-sm">{product.category}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-500 text-sm">Type:</p>
        <p className="text-sm">{product.type}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-500 text-sm">ID:</p>
        <p className="text-sm">{product.id}</p>
      </div>
      <div className="mt-4">
        <Link href={`/product/${product.id}`}>
          <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2">
            <span>Details</span>
            <TbExternalLink />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
