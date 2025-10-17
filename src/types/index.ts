export type AppRole = 'admin' | 'gerencia' | 'setor_clinica' | 'setor_cantina' | 'operador' | 'auditor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  sector?: string;
  active: boolean;
  createdAt: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  barcode: string;
  supplier: string;
  minStock: number;
  currentStock: number;
  sector: string;
  createdAt: string;
  updatedAt: string;
}

export type MovementType = 'entrada' | 'saida' | 'ajuste';

export interface Movement {
  id: string;
  materialId: string;
  materialName: string;
  type: MovementType;
  quantity: number;
  responsible: string;
  destination?: string;
  invoiceNumber?: string;
  justification?: string;
  createdAt: string;
}

export interface StockAlert {
  id: string;
  materialId: string;
  materialName: string;
  currentStock: number;
  minStock: number;
  sector: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  materialId?: string;
  sector?: string;
  userId?: string;
  type?: MovementType;
}
