import { useState } from 'react';
import type { Product } from '../../services/productService';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = 'https://placehold.co/400x300/1e1b4b/a5b4fc?text=No+Image';

const ProductCard = ({ product }: ProductCardProps) => {
  const [imgSrc, setImgSrc] = useState(() => {
    const img = product.images?.[0];
    if (!img) return FALLBACK_IMAGE;
    try {
      const parsed = JSON.parse(img);
      if (Array.isArray(parsed)) return parsed[0] || FALLBACK_IMAGE;
      return img;
    } catch {
      return img;
    }
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  return (
    <div className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-700">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-slate-900">
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category?.name || 'Tidak Terkategori'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-emerald-400 font-bold text-lg">{formatPrice(product.price)}</span>
          <span className="text-slate-400 text-xs">#{product.id}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
