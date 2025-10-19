'use client'

import React, { useState } from 'react'

interface Paciente {
  cpf: string
  nome: string
  temAlertas: boolean
}

interface CPFValidationCardProps {
  onPacienteIdentificado: (paciente: Paciente) => void
}

export default function CPFValidationCard({ onPacienteIdentificado }: CPFValidationCardProps) {
  const [cpf, setCpf] = useState('')
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Simulação de validação de CPF
  const validarCPF = async (cpfValue: string) => {
    setIsLoading(true)
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular dados de paciente (em produção viria da API)
    const pacientesMock = {
      '12345678901': { nome: 'João Silva', temAlertas: true },
      '98765432100': { nome: 'Maria Santos', temAlertas: false },
      '11122233344': { nome: 'Pedro Oliveira', temAlertas: true },
    }
    
    const pacienteEncontrado = pacientesMock[cpfValue as keyof typeof pacientesMock]
    
    if (pacienteEncontrado) {
      const novoPaciente: Paciente = {
        cpf: cpfValue,
        nome: pacienteEncontrado.nome,
        temAlertas: pacienteEncontrado.temAlertas
      }
      setPaciente(novoPaciente)
      onPacienteIdentificado(novoPaciente)
    } else {
      setPaciente(null)
    }
    
    setIsLoading(false)
  }

  const formatarCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatarCPF(e.target.value)
    setCpf(formatted)
    
    // Validar CPF quando tiver 14 caracteres (com formatação)
    if (formatted.length === 14) {
      validarCPF(formatted.replace(/\D/g, ''))
    } else {
      setPaciente(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Iniciar Atendimento</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPF:
          </label>
          <input
            type="text"
            value={cpf}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            maxLength={14}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition-all"
          />
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-blue"></div>
            <span className="ml-2 text-gray-600">Validando CPF...</span>
          </div>
        )}
        
        {paciente && !isLoading && (
          <div className="bg-secondary-light rounded-lg p-4 border border-secondary-medium">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {paciente.nome.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{paciente.nome}</p>
                  <p className="text-sm text-gray-600">CPF: {cpf}</p>
                </div>
              </div>
              <button className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/90 transition-colors">
                Ver Perfil
              </button>
            </div>
          </div>
        )}
        
        {cpf.length === 14 && !paciente && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">
              CPF não encontrado. Verifique se o paciente está cadastrado no sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

