import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Logo from '../../assets/Logo.svg';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-blue-400 font-semibold'
      : 'text-slate-300 hover:text-white';

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/products" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="Logo" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Shop Ega</span>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className={`text-sm transition-colors ${isActive('/products')}`}>
              Produk
            </Link>
            {isAuthenticated && (
              <Link to="/add-product" className={`text-sm transition-colors ${isActive('/add-product')}`}>
                Tambah Produk
              </Link>
            )}
          </div>

          {/* Auth Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-slate-300 text-sm">{user?.name || user?.email}</span>
                </div>
                <button
                  id="logout-btn"
                  onClick={handleLogout}
                  className="text-sm px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium"
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm block py-2 transition-colors ${isActive('/products')}`}
            >
              Produk
            </Link>
            {isAuthenticated && (
              <Link 
                to="/add-product" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm block py-2 transition-colors ${isActive('/add-product')}`}
              >
                Tambah Produk
              </Link>
            )}
          </div>

          <div className="border-t border-slate-800 mt-4 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm w-full text-center px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
