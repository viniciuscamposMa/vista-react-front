
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
import { Material } from '@/types';

interface NewMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (newMaterial: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function NewMaterialModal({ isOpen, onClose, onAddMaterial }: NewMaterialModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [supplier, setSupplier] = useState('');
  const [minStock, setMinStock] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [sector, setSector] = useState('');

  const handleSubmit = () => {
    const randomBarcode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
    const newMaterial = {
      name,
      category,
      unit,
      barcode: randomBarcode,
      supplier,
      minStock,
      currentStock,
      sector,
    };
    onAddMaterial(newMaterial);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Material</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoria
            </Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit" className="text-right">
              Unidade
            </Label>
            <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">
              Fornecedor
            </Label>
            <Input id="supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minStock" className="text-right">
              Estoque Mín.
            </Label>
            <Input id="minStock" type="number" value={minStock} onChange={(e) => setMinStock(Number(e.target.value))} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentStock" className="text-right">
              Estoque Atual
            </Label>
            <Input id="currentStock" type="number" value={currentStock} onChange={(e) => setCurrentStock(Number(e.target.value))} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sector" className="text-right">
              Setor
            </Label>
            <Input id="sector" value={sector} onChange={(e) => setSector(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
