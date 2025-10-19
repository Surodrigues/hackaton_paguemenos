'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'

interface Patient {
  id: string
  name: string
  cpf: string
  lastVisit: string
  conditions: string[]
  age: number
  gender: string
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'Pedro Henrique',
    cpf: '123.456.789-12',
    lastVisit: '14/07/2024',
    conditions: ['Diabetes', 'Hipertensão'],
    age: 23,
    gender: 'Masculino'
  },
  {
    id: '2',
    name: 'Maria Silva',
    cpf: '987.654.321-00',
    lastVisit: '10/07/2024',
    conditions: ['Hipertensão'],
    age: 38,
    gender: 'Feminino'
  },
  {
    id: '3',
    name: 'João Santos',
    cpf: '456.789.123-45',
    lastVisit: '08/07/2024',
    conditions: ['Diabetes'],
    age: 45,
    gender: 'Masculino'
  },
  {
    id: '4',
    name: 'Ana Costa',
    cpf: '789.123.456-78',
    lastVisit: '05/07/2024',
    conditions: ['Asma'],
    age: 31,
    gender: 'Feminino'
  },
  {
    id: '5',
    name: 'Carlos Oliveira',
    cpf: '321.654.987-00',
    lastVisit: '02/07/2024',
    conditions: ['Hipertensão', 'Diabetes'],
    age: 52,
    gender: 'Masculino'
  },
]

export default function PatientsPage() {
  const router = useRouter()
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cpf.includes(searchTerm)
    )
    setFilteredPatients(filtered)
  }, [searchTerm])

  const viewPatientProfile = (patientId: string) => {
    router.push(`/dashboard/paciente/${patientId}`)
  }

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

      {/* Campo de Busca */}
      <Card className="p-4">
        <div className="max-w-md">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar Paciente
          </label>
          <input
            id="search"
            type="text"
            placeholder="Nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pague-blue focus:border-transparent"
          />
        </div>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-pague-blue">{filteredPatients.length}</div>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Idade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Condições</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Última Visita</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{patient.name}</td>
                  <td className="py-3 px-4 text-gray-600">{patient.cpf}</td>
                  <td className="py-3 px-4 text-gray-600">{patient.age} anos</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition, index) => (
                        <Chip key={index} variant="warning" size="sm">
                          {condition}
                        </Chip>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewPatientProfile(patient.id)}
                      >
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
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum paciente encontrado com os filtros aplicados.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
