import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface FollowUpPageProps {
  onBack: () => void
}

export default function FollowUpPage({ onBack }: FollowUpPageProps) {
  const followUps = [
    {
      id: 1,
      patient: 'Pedro Henrique',
      protocol: 'Diabetes',
      startDate: '01/07/2024',
      nextAppointment: '15/08/2024',
      status: 'Em Acompanhamento',
      progress: 75
    },
    {
      id: 2,
      patient: 'Maria Silva',
      protocol: 'Hipertensão',
      startDate: '05/07/2024',
      nextAppointment: '20/08/2024',
      status: 'Em Acompanhamento',
      progress: 60
    },
    {
      id: 3,
      patient: 'João Santos',
      protocol: 'Diabetes',
      startDate: '10/06/2024',
      nextAppointment: '10/08/2024',
      status: 'Concluído',
      progress: 100
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800'
      case 'Em Acompanhamento':
        return 'bg-blue-100 text-blue-800'
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Acompanhamentos</h1>
          <p className="text-gray-600">Monitoramento de protocolos em andamento</p>
        </div>
        <Button variant="primary">
          + Novo Acompanhamento
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-blue">{followUps.length}</div>
            <div className="text-sm text-gray-600">Total de Acompanhamentos</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {followUps.filter(f => f.status === 'Em Acompanhamento').length}
            </div>
            <div className="text-sm text-gray-600">Em Andamento</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {followUps.filter(f => f.status === 'Concluído').length}
            </div>
            <div className="text-sm text-gray-600">Concluídos</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Próximos Vencimentos</div>
          </div>
        </Card>
      </div>

      {/* Lista de Acompanhamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {followUps.map((followUp) => (
          <Card key={followUp.id}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{followUp.patient}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.status)}`}>
                  {followUp.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Protocolo:</span>
                  <span className="text-gray-900 font-medium">{followUp.protocol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Início:</span>
                  <span className="text-gray-900">{followUp.startDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Próxima Consulta:</span>
                  <span className="text-gray-900">{followUp.nextAppointment}</span>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progresso</span>
                  <span className="text-gray-900 font-medium">{followUp.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${followUp.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

