import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Produk</h1>
          <p className="text-slate-400 text-sm">Jelajahi koleksi produk luar biasa kami</p>
        </div>

        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
