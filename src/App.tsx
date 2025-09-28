import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Loader from './components/common/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Лініве завантаження сторінок для оптимізації
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const CatalogPage = lazy(() => import('./pages/Catalog/CatalogPage'));
const FavoritesPage = lazy(() => import('./pages/Favorites/FavoritesPage'));
const CarDetailsPage = lazy(() => import('./pages/CarDetails/CarDetailsPage'));

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:carId" element={<CarDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
