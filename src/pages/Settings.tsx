import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Bell, Database, Shield } from 'lucide-react';

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Configurar parâmetros do sistema</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>Configure alertas e notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de estoque mínimo</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações quando itens atingirem estoque mínimo</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por e-mail</Label>
                  <p className="text-sm text-muted-foreground">Enviar alertas por e-mail</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatórios automáticos</Label>
                  <p className="text-sm text-muted-foreground">Gerar relatórios semanais automaticamente</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup e Dados
              </CardTitle>
              <CardDescription>Configurações de backup e armazenamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Frequência de backup</Label>
                <Input id="backup-frequency" defaultValue="Diário às 02:00" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention">Retenção de dados (dias)</Label>
                <Input id="retention" type="number" defaultValue="90" />
              </div>
              <Button variant="outline">Realizar Backup Manual</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>Configurações de segurança e acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de dois fatores</Label>
                  <p className="text-sm text-muted-foreground">Requer confirmação adicional no login</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Log de auditoria</Label>
                  <p className="text-sm text-muted-foreground">Registrar todas as ações dos usuários</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout de sessão (minutos)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Parâmetros Gerais
              </CardTitle>
              <CardDescription>Configurações gerais do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Instituição</Label>
                <Input id="company-name" defaultValue="Polícia Rodoviária Federal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Input id="timezone" defaultValue="America/Sao_Paulo" disabled />
              </div>
              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
