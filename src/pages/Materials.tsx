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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, Edit, Trash2, Barcode } from 'lucide-react';
import { Material } from '@/types';
import { NewMaterialModal } from '@/components/NewMaterialModal';
import { EditMaterialModal } from '@/components/EditMaterialModal';
import { useData } from '@/contexts/DataContext';

export default function Materials() {
  const { materials, addMaterial, deleteMaterial, updateMaterial } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null);
  const [materialToEdit, setMaterialToEdit] = useState<Material | null>(null);

  const handleAddMaterial = (newMaterial: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>) => {
    addMaterial(newMaterial);
  };

  const handleUpdateMaterial = (updatedMaterial: Material) => {
    updateMaterial(updatedMaterial);
  };

  const openDeleteDialog = (material: Material) => {
    setMaterialToDelete(material);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteMaterial = () => {
    if (materialToDelete) {
      deleteMaterial(materialToDelete.id);
      setIsDeleteDialogOpen(false);
      setMaterialToDelete(null);
    }
  };

  const openEditModal = (material: Material) => {
    setMaterialToEdit(material);
    setIsEditModalOpen(true);
  };

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <Button onClick={() => setIsNewModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Material
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou categoria..."
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
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(material)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(material)}>
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
      <NewMaterialModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddMaterial={handleAddMaterial}
      />
      <EditMaterialModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateMaterial={handleUpdateMaterial}
        material={materialToEdit}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá apagar permanentemente o material e todos os seus dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMaterialToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMaterial}>Apagar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
