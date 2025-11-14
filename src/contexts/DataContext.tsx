
import { createContext, useContext, useState, ReactNode } from 'react';
import { Material, Movement } from '@/types';
import { mockMaterials, mockMovements } from '@/lib/mockData';

interface DataContextType {
  materials: Material[];
  movements: Movement[];
  addMaterial: (newMaterial: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addMovement: (newMovement: Omit<Movement, 'id' | 'createdAt'>) => void;
  deleteMaterial: (materialId: string) => void;
  updateMaterial: (updatedMaterial: Material) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [movements, setMovements] = useState<Movement[]>(mockMovements);

  const addMaterial = (newMaterial: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>) => {
    const materialToAdd: Material = {
      ...newMaterial,
      id: (materials.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMaterials(prev => [...prev, materialToAdd]);
  };

  const addMovement = (newMovement: Omit<Movement, 'id' | 'createdAt'>) => {
    const movementToAdd: Movement = {
      ...newMovement,
      id: (movements.length + 1).toString(),
      createdAt: new Date().toISOString(),
    };
    setMovements(prev => [movementToAdd, ...prev]);
  };

  const deleteMaterial = (materialId: string) => {
    setMaterials(prev => prev.filter(material => material.id !== materialId));
  };

  const updateMaterial = (updatedMaterial: Material) => {
    setMaterials(prev => prev.map(material =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    ));
  };

  return (
    <DataContext.Provider value={{ materials, movements, addMaterial, addMovement, deleteMaterial, updateMaterial }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
