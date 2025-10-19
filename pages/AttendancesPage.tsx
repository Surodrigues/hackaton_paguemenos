import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface AttendancesPageProps {
  onBack: () => void
}

export default function AttendancesPage({ onBack }: AttendancesPageProps) {
  const attendances = [
    { 
      id: 1, 
      patient: 'Pedro Henrique', 
      cpf: '123.456.789-12',
      date: '14/07/2024', 
      time: '14:30',
      protocol: 'Diabetes', 
      status: 'Concluído',
      pharmacist: 'Dr. João Silva'
    },
    { 
      id: 2, 
      patient: 'Maria Silva', 
      cpf: '987.654.321-00',
      date: '10/07/2024', 
      time: '10:15',
      protocol: 'Hipertensão', 
      status: 'Em Andamento',
      pharmacist: 'Dra. Ana Costa'
    },
    { 
      id: 3, 
      patient: 'João Santos', 
      cpf: '456.789.123-45',
      date: '08/07/2024', 
      time: '16:45',
      protocol: 'Gripe', 
      status: 'Concluído',
      pharmacist: 'Dr. João Silva'
    },
    { 
      id: 4, 
      patient: 'Ana Costa', 
      cpf: '789.123.456-78',
      date: '05/07/2024', 
      time: '09:20',
      protocol: 'Asma', 
      status: 'Concluído',
      pharmacist: 'Dra. Ana Costa'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800'
      case 'Em Andamento':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pendente':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
          <p className="text-gray-600">Histórico de atendimentos realizados</p>
        </div>
        <Button variant="primary">
          + Novo Atendimento
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-blue">{attendances.length}</div>
            <div className="text-sm text-gray-600">Total de Atendimentos</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {attendances.filter(a => a.status === 'Concluído').length}
            </div>
            <div className="text-sm text-gray-600">Concluídos</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {attendances.filter(a => a.status === 'Em Andamento').length}
            </div>
            <div className="text-sm text-gray-600">Em Andamento</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>
        </Card>
      </div>

      {/* Lista de Atendimentos */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data/Hora</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Protocolo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Farmacêutico</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-gray-900 font-medium">{attendance.patient}</div>
                      <div className="text-gray-500 text-sm">{attendance.cpf}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-gray-900">{attendance.date}</div>
                      <div className="text-gray-500 text-sm">{attendance.time}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{attendance.protocol}</td>
                  <td className="py-3 px-4 text-gray-600">{attendance.pharmacist}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attendance.status)}`}>
                      {attendance.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

