import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { PetDto } from '@world-beauty/core/dtos'
import {
  genderSchema,
  nameSchema,
  petTypeSchema,
  idSchema,
} from '@world-beauty/validation/schemas'
import { PetType } from '@world-beauty/core/enums'
import { Customer } from '@world-beauty/core/entities'
import { GetAllCustomersUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '@/database'

const petSchema = z.object({
  name: nameSchema,
  type: petTypeSchema,
  breed: nameSchema,
  gender: genderSchema,
  customerId: idSchema,
})

type PetFormFields = z.infer<typeof petSchema>

export function usePetForm(
  onSubmit: (petDto: PetDto) => void,
  petDto?: PetDto,
) {
  const { control, formState, register, handleSubmit } = useForm<PetFormFields>({
    defaultValues: {
      name: petDto?.name,
      type: petDto?.type as PetType,
      breed: petDto?.breed,
      gender: (petDto?.gender as 'male' | 'female') ?? 'male',
      customerId: petDto?.custumer?.id,
    },
    resolver: zodResolver(petSchema),
  })
  const [customers, setCustomers] = useState<Customer[]>([])

  async function handleFormSubmit(fields: PetFormFields) {
    const petDto: PetDto = {
      name: fields.name,
      type: fields.type,
      breed: fields.breed,
      gender: fields.gender,
      custumer: {
        id: fields.customerId,
      }
    }

    onSubmit(petDto)
  }

  async function fetchCustomers() {
    const customers = await new GetAllCustomersUseCase(customersRepository).execute()
    setCustomers(customers.map((customer) => Customer.create(customer)))
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return {
    customers,
    formControl: control,
    formErrors: formState.errors,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
