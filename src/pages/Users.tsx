import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, UserCheck, UserX } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Administrador', email: 'admin@prf.gov.br', role: 'admin', sector: '-', active: true },
  { id: '2', name: 'Gerente Operacional', email: 'gerente@prf.gov.br', role: 'gerencia', sector: '-', active: true },
  { id: '3', name: 'Responsável Clínica', email: 'clinica@prf.gov.br', role: 'setor_clinica', sector: 'Clínica', active: true },
  { id: '4', name: 'Responsável Cantina', email: 'cantina@prf.gov.br', role: 'setor_cantina', sector: 'Cantina', active: true },
  { id: '5', name: 'Operador Estoque', email: 'operador@prf.gov.br', role: 'operador', sector: 'Depósito', active: true },
  { id: '6', name: 'Auditor', email: 'auditor@prf.gov.br', role: 'auditor', sector: '-', active: false },
];

const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    admin: 'Administrador',
    gerencia: 'Gerência',
    setor_clinica: 'Resp. Clínica',
    setor_cantina: 'Resp. Cantina',
    operador: 'Operador',
    auditor: 'Auditor',
  };
  return labels[role] || role;
};

export default function Users() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Usuários</h1>
            <p className="text-muted-foreground">Gerenciar usuários e permissões do sistema</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                  </TableCell>
                  <TableCell>{user.sector}</TableCell>
                  <TableCell className="text-center">
                    {user.active ? (
                      <Badge variant="default" className="gap-1">
                        <UserCheck className="h-3 w-3" />
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <UserX className="h-3 w-3" />
                        Inativo
                      </Badge>
                    )}
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
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Mostrando {mockUsers.length} usuários</p>
        </div>
      </div>
    </Layout>
  );
}
