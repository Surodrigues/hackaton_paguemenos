// app/api/patients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Patient, PaginatedResponse } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    // Mock data
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Pedro Henrique',
        cpf: '123.456.789-12',
        birthDate: '15/12/2000',
        age: 23,
        gender: 'Masculino',
        conditions: ['Diabetes', 'Hipertensão'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Maria Silva',
        cpf: '987.654.321-00',
        birthDate: '20/05/1985',
        age: 38,
        gender: 'Feminino',
        conditions: ['Hipertensão'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Filter by search
    const filteredPatients = search 
      ? mockPatients.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.cpf.includes(search)
        )
      : mockPatients

    const total = filteredPatients.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const data = filteredPatients.slice(startIndex, endIndex)

    const response: PaginatedResponse<Patient> = {
      data,
      total,
      page,
      limit,
      totalPages
    }

    return NextResponse.json({
      success: true,
      data: response
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar pacientes'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json()

    // Mock patient creation
    const newPatient: Patient = {
      id: Date.now().toString(),
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json({
      success: true,
      data: newPatient,
      message: 'Paciente criado com sucesso'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao criar paciente'
    }, { status: 500 })
  }
}
