
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Material, Movement } from '@/types';
import { mockMaterials } from '@/lib/mockData'; // Assuming mockData for now

interface NewExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovement: (newMovement: Omit<Movement, 'id' | 'materialName' | 'responsible' | 'createdAt'>) => void;
}

export function NewExitModal({ isOpen, onClose, onAddMovement }: NewExitModalProps) {
  const [materialId, setMaterialId] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(0);
  const [movementDate, setMovementDate] = useState('');
  const [notes, setNotes] = useState('');
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    // In a real application, you would fetch materials from an API
    setMaterials(mockMaterials);
  }, []);

  const handleSubmit = () => {
    if (!materialId || quantity <= 0 || !movementDate) {
      // Basic validation
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const selectedMaterial = materials.find(mat => mat.id === materialId);
    if (!selectedMaterial) {
      alert('Material selecionado inválido.');
      return;
    }

    const newMovement: Omit<Movement, 'id' | 'materialName' | 'responsible' | 'createdAt'> = {
      materialId: materialId,
      quantity: quantity,
      type: 'saida',
      movementDate: new Date(movementDate).toISOString(),
      notes: notes,
    };
    onAddMovement(newMovement);
    onClose();
    // Reset form
    setMaterialId(undefined);
    setQuantity(0);
    setMovementDate('');
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Saída de Material</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="material" className="text-right">
              Material
            </Label>
            <Select onValueChange={setMaterialId} value={materialId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o Material" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantidade
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="movementDate" className="text-right">
              Data
            </Label>
            <Input
              id="movementDate"
              type="date"
              value={movementDate}
              onChange={(e) => setMovementDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Observações
            </Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Registrar Saída
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
