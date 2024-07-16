'use client'

import { ReactNode, createContext, useContext } from 'react'

import {
  CreateArchiveFormData,
  createArchiveSchema,
} from '@/config/validations/create-archive'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const CreateArchiveFormContext = createContext<ReturnType<
  typeof useCreateArchiveForm
> | null>(null)

const useCreateArchiveForm = () => {
  const form = useForm<CreateArchiveFormData>({
    resolver: zodResolver(createArchiveSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      resume: '',
    },
  })

  return {
    form,
  }
}

export const useCreateArchiveFormContext = () => {
  const context = useContext(CreateArchiveFormContext)
  if (!context) {
    throw new Error('CreateArchiveFormContext가 없습니다.')
  }
  return context
}

export const ArchiveFormProvider = ({ children }: { children: ReactNode }) => {
  const { form } = useCreateArchiveForm()

  return (
    <CreateArchiveFormContext.Provider value={{ form }}>
      {children}
    </CreateArchiveFormContext.Provider>
  )
}
