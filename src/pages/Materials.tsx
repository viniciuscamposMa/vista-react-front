import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Barcode } from 'lucide-react';
import { mockMaterials } from '@/lib/mockData';
import { Material } from '@/types';

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.barcode.includes(searchTerm) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (material: Material) => {
    if (material.currentStock <= material.minStock) {
      return { label: 'Baixo', variant: 'destructive' as const };
    }
    if (material.currentStock <= material.minStock * 1.5) {
      return { label: 'Atenção', variant: 'secondary' as const };
    }
    return { label: 'Normal', variant: 'default' as const };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Materiais</h1>
            <p className="text-muted-foreground">Gerenciar cadastro de insumos e materiais</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Material
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, código de barras ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Barcode className="mr-2 h-4 w-4" />
            Escanear
          </Button>
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Código de Barras</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead className="text-center">Estoque Atual</TableHead>
                <TableHead className="text-center">Estoque Mínimo</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    Nenhum material encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredMaterials.map((material) => {
                  const status = getStockStatus(material);
                  return (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.name}</TableCell>
                      <TableCell>{material.category}</TableCell>
                      <TableCell className="font-mono text-sm">{material.barcode}</TableCell>
                      <TableCell>{material.sector}</TableCell>
                      <TableCell className="text-center">{material.currentStock} {material.unit}</TableCell>
                      <TableCell className="text-center">{material.minStock} {material.unit}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Mostrando {filteredMaterials.length} de {materials.length} materiais</p>
        </div>
      </div>
    </Layout>
  );
}
