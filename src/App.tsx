import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/common/Notification';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './middleware/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 flex flex-col">
          <Routes>
            {/* Login — no Navbar */}
            <Route path="/login" element={<LoginPage />} />

            {/* App routes — with Navbar */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/products" element={<ProductsPage />} />
                      <Route
                        path="/add-product"
                        element={
                          <ProtectedRoute>
                            <AddProductPage />
                          </ProtectedRoute>
                        }
                      />
                      {/* Default redirect */}
                      <Route path="*" element={<Navigate to="/products" replace />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
