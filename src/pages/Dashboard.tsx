import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { StockAlert } from '@/types';

export default function Dashboard() {
  const { materials, movements } = useData();

  const totalMaterials = materials.length;
  
  const stockAlerts: StockAlert[] = materials
    .filter(m => m.currentStock <= m.minStock)
    .map(m => ({
      id: m.id,
      materialId: m.id,
      materialName: m.name,
      currentStock: m.currentStock,
      minStock: m.minStock,
      sector: m.sector,
    }));
  
  const lowStockItems = stockAlerts.length;
  
  const recentMovements = movements.slice(0, 5);
  
  const todayEntries = movements.filter(m => 
    m.type === 'entrada' && 
    new Date(m.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const todayExits = movements.filter(m => 
    m.type === 'saida' && 
    new Date(m.createdAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema de controle de insumos</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Materiais</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMaterials}</div>
              <p className="text-xs text-muted-foreground">cadastrados no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas de Estoque</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground">itens abaixo do mínimo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entradas Hoje</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayEntries}</div>
              <p className="text-xs text-muted-foreground">movimentações de entrada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saídas Hoje</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayExits}</div>
              <p className="text-xs text-muted-foreground">movimentações de saída</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Stock Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Alertas de Estoque Mínimo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stockAlerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum alerta no momento</p>
              ) : (
                <div className="space-y-3">
                  {stockAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{alert.materialName}</p>
                        <p className="text-xs text-muted-foreground">{alert.sector}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="mb-1">
                          {alert.currentStock} / {alert.minStock}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Link to="/materials" className="text-sm text-primary hover:underline">
                    Ver todos os materiais →
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Movements */}
          <Card>
            <CardHeader>
              <CardTitle>Movimentações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{movement.materialName}</p>
                      <p className="text-xs text-muted-foreground">{movement.responsible}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={movement.type === 'entrada' ? 'default' : movement.type === 'saida' ? 'secondary' : 'outline'}
                        className="mb-1"
                      >
                        {movement.type === 'entrada' ? '+' : movement.type === 'saida' ? '-' : '±'}{movement.quantity}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(movement.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
                <Link to="/movements" className="text-sm text-primary hover:underline">
                  Ver todas as movimentações →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
