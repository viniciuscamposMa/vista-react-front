import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { TooltipProvider } from './components/ui/tooltip';
import App from './App';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Materials from './pages/Materials';
import Movements from './pages/Movements';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ThemeProvider } from './components/theme-provider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<App />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/materials" element={<ProtectedRoute allowedRoles={['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'operador']}><Materials /></ProtectedRoute>} />
                  <Route path="/movements" element={<ProtectedRoute allowedRoles={['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'operador']}><Movements /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute allowedRoles={['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'auditor']}><Reports /></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute allowedRoles={['admin']}><Users /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

