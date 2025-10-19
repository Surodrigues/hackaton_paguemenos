import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface PatientsPageProps {
  onBack: () => void
}

export default function PatientsPage({ onBack }: PatientsPageProps) {
  const patients = [
    { id: 1, name: 'Pedro Henrique', cpf: '123.456.789-12', lastVisit: '14/07/2024', conditions: ['Diabetes', 'Hipertensão'] },
    { id: 2, name: 'Maria Silva', cpf: '987.654.321-00', lastVisit: '10/07/2024', conditions: ['Hipertensão'] },
    { id: 3, name: 'João Santos', cpf: '456.789.123-45', lastVisit: '08/07/2024', conditions: ['Diabetes'] },
    { id: 4, name: 'Ana Costa', cpf: '789.123.456-78', lastVisit: '05/07/2024', conditions: ['Asma'] },
    { id: 5, name: 'Carlos Oliveira', cpf: '321.654.987-00', lastVisit: '02/07/2024', conditions: ['Hipertensão', 'Diabetes'] },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Lista de pacientes cadastrados no sistema</p>
        </div>
        <Button variant="primary">
          + Novo Paciente
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-blue">{patients.length}</div>
            <div className="text-sm text-gray-600">Total de Pacientes</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Atendidos Hoje</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Alertas</div>
          </div>
        </Card>
      </div>

      {/* Lista de Pacientes */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CPF</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Condições</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Última Visita</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{patient.name}</td>
                  <td className="py-3 px-4 text-gray-600">{patient.cpf}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Ver Perfil
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

