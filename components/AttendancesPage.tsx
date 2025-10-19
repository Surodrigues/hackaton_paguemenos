import React from 'react'
import Card from './ui/Card'
import Button from './ui/Button'

interface AttendancesPageProps {
  onBack: () => void
}

export default function AttendancesPage({ onBack }: AttendancesPageProps) {
  const attendances = [
    { id: 1, patient: 'Pedro Henrique', date: '14/07/2024', protocol: 'Diabetes', status: 'Concluído' },
    { id: 2, patient: 'Maria Silva', date: '10/07/2024', protocol: 'Hipertensão', status: 'Em Andamento' },
    { id: 3, patient: 'João Santos', date: '08/07/2024', protocol: 'Gripe', status: 'Concluído' },
  ]

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

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Protocolo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{attendance.patient}</td>
                  <td className="py-3 px-4 text-gray-600">{attendance.date}</td>
                  <td className="py-3 px-4 text-gray-600">{attendance.protocol}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      attendance.status === 'Concluído' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {attendance.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      Ver Detalhes
                    </Button>
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

