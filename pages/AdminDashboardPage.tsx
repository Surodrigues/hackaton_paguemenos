import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface AdminDashboardPageProps {
  onBack: () => void
}

export default function AdminDashboardPage({ onBack }: AdminDashboardPageProps) {
  const stats = [
    { title: 'Total de Usuários', value: '156', color: 'blue', icon: '👥' },
    { title: 'Protocolos Ativos', value: '24', color: 'green', icon: '📋' },
    { title: 'Atendimentos Hoje', value: '89', color: 'yellow', icon: '🩺' },
    { title: 'Alertas Pendentes', value: '12', color: 'red', icon: '⚠️' }
  ]

  const recentActivities = [
    { id: 1, action: 'Novo protocolo criado', user: 'Dr. João Silva', time: '2 min atrás' },
    { id: 2, action: 'Usuário cadastrado', user: 'Maria Santos', time: '15 min atrás' },
    { id: 3, action: 'Protocolo atualizado', user: 'Dr. Ana Costa', time: '1 hora atrás' },
    { id: 4, action: 'Relatório gerado', user: 'Sistema', time: '2 horas atrás' }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Visão geral do sistema e gerenciamento</p>
        </div>
        <Button variant="primary">
          + Nova Ação
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <Card title="Atividades Recentes">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">por {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Ações Rápidas */}
        <Card title="Ações Rápidas">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">👥</span>
              <span className="text-sm">Gerenciar Usuários</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">📋</span>
              <span className="text-sm">Criar Protocolo</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm">Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">⚙️</span>
              <span className="text-sm">Configurações</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Protocolos em Destaque */}
      <Card title="Protocolos Mais Utilizados">
        <div className="space-y-3">
          {[
            { name: 'Protocolo Diabetes', usage: 45, color: 'bg-green-500' },
            { name: 'Protocolo Hipertensão', usage: 38, color: 'bg-blue-500' },
            { name: 'Protocolo Gripe', usage: 28, color: 'bg-yellow-500' },
            { name: 'Protocolo Asma', usage: 15, color: 'bg-purple-500' }
          ].map((protocol, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{protocol.name}</span>
                <span className="text-gray-900 font-medium">{protocol.usage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${protocol.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${protocol.usage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
