import React from 'react'
import Card from './ui/Card'
import Button from './ui/Button'

interface PatientsPageProps {
  onBack: () => void
}

export default function PatientsPage({ onBack }: PatientsPageProps) {
  const patients = [
    { id: 1, name: 'Pedro Henrique', cpf: '123.456.789-12', lastVisit: '14/07/2024' },
    { id: 2, name: 'Maria Silva', cpf: '987.654.321-00', lastVisit: '10/07/2024' },
    { id: 3, name: 'João Santos', cpf: '456.789.123-45', lastVisit: '08/07/2024' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Lista de pacientes cadastrados</p>
        </div>
        <Button variant="primary">
          + Novo Paciente
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CPF</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Última Visita</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{patient.name}</td>
                  <td className="py-3 px-4 text-gray-600">{patient.cpf}</td>
                  <td className="py-3 px-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      Ver Perfil
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

