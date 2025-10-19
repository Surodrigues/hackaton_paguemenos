import React from 'react'
import Card from './ui/Card'
import Button from './ui/Button'
import Chip from './ui/Chip'

interface AnamneseProps {
  patient: {
    name: string
    conditions: string[]
    medications: string[]
  }
  onNext: () => void
  onBack: () => void
}

export default function Anamnese({ patient, onNext, onBack }: AnamneseProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Anamnese</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-700">{patient.name}</span>
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>
      </div>

      {/* Condição de Saúde */}
      <Card title="Condição de Saúde">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-gray-600 text-sm">
              Informações sobre as condições de saúde do paciente
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((condition, index) => (
              <Chip key={index} variant="warning">
                {condition}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      {/* Remédios em Uso */}
      <Card title="Remédios em Uso">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-gray-600 text-sm">
              Medicamentos atualmente em uso pelo paciente
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {patient.medications.map((medication, index) => (
              <Chip key={index} variant="success">
                {medication}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      {/* Botão Próximo */}
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          size="lg"
          onClick={onNext}
          className="bg-custom-red hover:bg-red-600"
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

