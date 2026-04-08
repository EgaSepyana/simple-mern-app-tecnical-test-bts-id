import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/productStore';
import { productService, type Category } from '../../services/productService';
import { useNotification } from '../common/Notification';
import { validation } from '../../utils/validation';

interface FormData {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  images: string;
}

interface FormErrors {
  title?: string;
  price?: string;
  categoryId?: string;
}

const AddProductForm = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();
  const { showNotification } = useNotification();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    productService.getCategories().then(setCategories).catch(console.error);
  }, []);

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};

    const titleRequired = validation.required(data.title);
    if (titleRequired) errs.title = titleRequired;
    else {
      const titleMax = validation.maxLength(data.title, 150);
      if (titleMax) errs.title = titleMax;
    }

    const priceRequired = validation.required(data.price);
    if (priceRequired) errs.price = priceRequired;
    else {
      const priceNum = validation.isNumber(data.price);
      if (priceNum) errs.price = priceNum;
      else {
        const pricePos = validation.positiveNumber(data.price);
        if (pricePos) errs.price = pricePos;
      }
    }

    const catRequired = validation.required(data.categoryId);
    if (catRequired) errs.categoryId = catRequired;

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, price: true, categoryId: true });
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const images = formData.images.trim()
        ? [formData.images.trim()]
        : ['https://placehold.co/400x300/1e1b4b/a5b4fc?text=Produk'];

      await addProduct({
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        categoryId: Number(formData.categoryId),
        images,
      });

      showNotification('Produk berhasil dibuat! 🎉', 'success');
      setFormData({ title: '', price: '', description: '', categoryId: '', images: '' });
      setTouched({});
      setTimeout(() => navigate('/products'), 1500);
    } catch {
      showNotification('Gagal membuat produk. Silakan coba lagi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(validate(formData)).length === 0;

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-sm ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:ring-red-500/30'
        : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="title">
          Judul Produk <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={150}
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Masukkan judul produk..."
          className={inputClass('title')}
        />
        <div className="flex justify-between mt-1">
          {touched.title && errors.title ? (
            <p className="text-red-400 text-xs">{errors.title}</p>
          ) : <span />}
          <p className="text-slate-500 text-xs">{formData.title.length}/150</p>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="price">
          Harga (USD) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0.00"
            className={`${inputClass('price')} pl-7`}
          />
        </div>
        {touched.price && errors.price && (
          <p className="text-red-400 text-xs mt-1">{errors.price}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="categoryId">
          Kategori <span className="text-red-400">*</span>
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClass('categoryId')} appearance-none`}
        >
          <option value="">Pilih kategori...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {touched.categoryId && errors.categoryId && (
          <p className="text-red-400 text-xs mt-1">{errors.categoryId}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="description">
          Deskripsi <span className="text-slate-500 font-normal">(opsional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Deskripsikan produk Anda..."
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="images">
          URL Gambar <span className="text-slate-500 font-normal">(opsional)</span>
        </label>
        <input
          id="images"
          name="images"
          type="url"
          value={formData.images}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm font-medium"
        >
          Batal
        </button>
        <button
          id="submit-product-btn"
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Membuat...
            </>
          ) : (
            'Buat Produk'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
