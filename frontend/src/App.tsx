import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/organisms/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProducerFarmsPage } from './pages/ProducerFarmsPage';
import { ProducersPage } from './pages/ProducersPage';

export function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/producers" replace />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/producers/:id/farms" element={<ProducerFarmsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}
