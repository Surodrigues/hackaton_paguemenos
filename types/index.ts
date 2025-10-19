// types/patient.ts
export interface Patient {
  id: string
  name: string
  cpf: string
  birthDate: string
  age: number
  gender: 'Masculino' | 'Feminino'
  conditions: string[]
  createdAt: Date
  updatedAt: Date
}

// types/appointment.ts
export interface Appointment {
  id: string
  patientId: string
  date: string
  protocol: string
  status: 'Agendado' | 'Realizado' | 'Cancelado'
  notes?: string
}

// types/protocol.ts
export interface Protocol {
  id: string
  name: string
  type: 'diabetes' | 'hypertension' | 'general'
  questions: Question[]
  createdAt: Date
}

export interface Question {
  id: string
  text: string
  type: 'text' | 'number' | 'boolean' | 'select'
  options?: string[]
  required: boolean
  validation?: ValidationRule[]
}

export interface ValidationRule {
  type: 'min' | 'max' | 'pattern' | 'required'
  value?: any
  message: string
}

// types/medication.ts
export interface Medication {
  id: string
  name: string
  dosage: string
  quantity: number
  price: number
  available: boolean
  category: string
  description?: string
}

// types/anamnesis.ts
export interface Anamnesis {
  id: string
  patientId: string
  symptoms: string
  weight: number
  height: number
  bmi: number
  chronicConditions: boolean
  allergies: boolean
  lifestyle: {
    alcohol: boolean
    drugs: boolean
    smoking: boolean
  }
  createdAt: Date
}

// types/user.ts
export interface User {
  id: string
  name: string
  cpf: string
  role: 'farmaceutico' | 'administrador'
  email?: string
  createdAt: Date
  updatedAt: Date
}

// types/auth.ts
export interface AuthUser {
  id: string
  name: string
  role: 'farmaceutico' | 'administrador'
  token: string
}

// types/api.ts
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
