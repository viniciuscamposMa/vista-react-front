import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <Outlet />
      <Toaster />
    </DataProvider>
  );
}

export default App;
