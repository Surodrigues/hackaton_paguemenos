// hooks/usePatient.ts
import { useState, useEffect } from 'react'
import { Patient } from '@/types'

export function usePatient(patientId: string) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (patientId) {
      fetchPatient(patientId)
    }
  }, [patientId])

  const fetchPatient = async (id: string) => {
    try {
      setLoading(true)
      // Mock data for now
      const mockPatient: Patient = {
        id: id,
        name: 'Pedro Henrique',
        cpf: '123.456.789-12',
        birthDate: '15/12/2000',
        age: 23,
        gender: 'Masculino',
        conditions: ['Diabetes', 'Hipertensão'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPatient(mockPatient)
    } catch (err) {
      setError('Erro ao carregar paciente')
    } finally {
      setLoading(false)
    }
  }

  return { patient, loading, error, refetch: () => fetchPatient(patientId) }
}
