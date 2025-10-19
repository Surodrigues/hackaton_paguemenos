import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface ReportsPageProps {
  onBack: () => void
}

export default function ReportsPage({ onBack }: ReportsPageProps) {
  const reports = [
    {
      id: 1,
      title: 'Relatório Mensal de Atendimentos',
      description: 'Análise completa dos atendimentos realizados no mês',
      period: 'Julho 2024',
      status: 'Disponível',
      lastGenerated: '01/08/2024'
    },
    {
      id: 2,
      title: 'Protocolos Mais Utilizados',
      description: 'Ranking dos protocolos mais prescritos',
      period: 'Últimos 3 meses',
      status: 'Disponível',
      lastGenerated: '28/07/2024'
    },
    {
      id: 3,
      title: 'Eficácia dos Tratamentos',
      description: 'Análise da eficácia dos protocolos aplicados',
      period: 'Últimos 6 meses',
      status: 'Processando',
      lastGenerated: '25/07/2024'
    },
    {
      id: 4,
      title: 'Relatório de Pacientes Crônicos',
      description: 'Acompanhamento de pacientes com condições crônicas',
      period: 'Anual',
      status: 'Disponível',
      lastGenerated: '20/07/2024'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800'
      case 'Processando':
        return 'bg-yellow-100 text-yellow-800'
      case 'Erro':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e relatórios do sistema</p>
        </div>
        <Button variant="primary">
          + Gerar Relatório
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-blue">{reports.length}</div>
            <div className="text-sm text-gray-600">Total de Relatórios</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'Disponível').length}
            </div>
            <div className="text-sm text-gray-600">Disponíveis</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'Processando').length}
            </div>
            <div className="text-sm text-gray-600">Processando</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-600">Com Erro</div>
          </div>
        </Card>
      </div>

      {/* Lista de Relatórios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Período:</span>
                  <span className="text-gray-900 font-medium">{report.period}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última Geração:</span>
                  <span className="text-gray-900">{report.lastGenerated}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex-1"
                  disabled={report.status !== 'Disponível'}
                >
                  {report.status === 'Disponível' ? 'Baixar' : 'Gerar'}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Configurar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Relatórios Rápidos */}
      <Card title="Relatórios Rápidos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">📊</span>
            <span className="text-sm">Atendimentos Hoje</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">👥</span>
            <span className="text-sm">Pacientes Ativos</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">⚠️</span>
            <span className="text-sm">Alertas Pendentes</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

