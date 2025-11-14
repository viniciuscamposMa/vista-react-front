import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ArrowUpDown, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { ModeToggle } from './theme-toggle';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'operador', 'auditor'] },
    { name: 'Materiais', href: '/materials', icon: Package, roles: ['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'operador'] },
    { name: 'Movimentações', href: '/movements', icon: ArrowUpDown, roles: ['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'operador'] },
    { name: 'Relatórios', href: '/reports', icon: FileText, roles: ['admin', 'gerencia', 'setor_clinica', 'setor_cantina', 'auditor'] },
    { name: 'Usuários', href: '/users', icon: Users, roles: ['admin'] },
    { name: 'Configurações', href: '/settings', icon: Settings, roles: ['admin'] },
  ];

  const visibleNavigation = navigation.filter(item => 
    hasRole(item.roles as any)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <h1 className="text-xl font-bold text-foreground">PRF - Controle de Insumos</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="text-sm text-right hidden sm:block">
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-muted-foreground text-xs">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card
          transition-transform duration-200 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="flex flex-col gap-1 p-4">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                    transition-colors
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
