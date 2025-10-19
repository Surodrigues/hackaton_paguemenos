// app/api/patients/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Patient } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Mock patient data
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

    return NextResponse.json({
      success: true,
      data: mockPatient
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar paciente'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updateData = await request.json()

    // Mock patient update
    const updatedPatient: Patient = {
      id: id,
      ...updateData,
      updatedAt: new Date()
    }

    return NextResponse.json({
      success: true,
      data: updatedPatient,
      message: 'Paciente atualizado com sucesso'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao atualizar paciente'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Mock patient deletion
    return NextResponse.json({
      success: true,
      message: 'Paciente removido com sucesso'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao remover paciente'
    }, { status: 500 })
  }
}
