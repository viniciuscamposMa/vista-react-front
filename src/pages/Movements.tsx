import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';
import { mockMovements } from '@/lib/mockData';
import { Movement, MovementType } from '@/types';

export default function Movements() {
  const [movements] = useState<Movement[]>(mockMovements);
  const [activeTab, setActiveTab] = useState<MovementType | 'all'>('all');

  const filteredMovements = activeTab === 'all' 
    ? movements 
    : movements.filter(m => m.type === activeTab);

  const getMovementIcon = (type: MovementType) => {
    switch (type) {
      case 'entrada':
        return <ArrowUpCircle className="h-4 w-4 text-green-600" />;
      case 'saida':
        return <ArrowDownCircle className="h-4 w-4 text-orange-600" />;
      case 'ajuste':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
    }
  };

  const getMovementBadge = (type: MovementType) => {
    switch (type) {
      case 'entrada':
        return <Badge variant="default">Entrada</Badge>;
      case 'saida':
        return <Badge variant="secondary">Saída</Badge>;
      case 'ajuste':
        return <Badge variant="outline">Ajuste</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Movimentações</h1>
            <p className="text-muted-foreground">Registrar e visualizar entradas, saídas e ajustes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Nova Entrada
            </Button>
            <Button variant="outline">
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Nova Saída
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Ajuste de Inventário
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="entrada">Entradas</TabsTrigger>
            <TabsTrigger value="saida">Saídas</TabsTrigger>
            <TabsTrigger value="ajuste">Ajustes</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Nenhuma movimentação encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMovementIcon(movement.type)}
                            {getMovementBadge(movement.type)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{movement.materialName}</TableCell>
                        <TableCell className="text-center">
                          <span className={`font-semibold ${
                            movement.type === 'entrada' ? 'text-green-600' : 
                            movement.type === 'saida' ? 'text-orange-600' : 
                            'text-blue-600'
                          }`}>
                            {movement.type === 'entrada' ? '+' : movement.type === 'saida' ? '-' : '±'}
                            {movement.quantity}
                          </span>
                        </TableCell>
                        <TableCell>{movement.responsible}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {movement.invoiceNumber && `NF: ${movement.invoiceNumber}`}
                          {movement.destination && `Destino: ${movement.destination}`}
                          {movement.justification && `Justificativa: ${movement.justification}`}
                        </TableCell>
                        <TableCell>
                          {new Date(movement.createdAt).toLocaleString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
              <p>Mostrando {filteredMovements.length} movimentações</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
