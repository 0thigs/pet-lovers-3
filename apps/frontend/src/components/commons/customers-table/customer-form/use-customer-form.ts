import { useCallback } from 'react'
import { string, z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CustomerDto } from '@world-beauty/core/dtos'

import {
  cpfSchema,
  nameSchema,
  phoneSchema,
  rgSchema,
} from '@world-beauty/validation/schemas'

const customerSchema = z.object({
  name: nameSchema,
  socialName: string().optional(),
  cpf: cpfSchema,
  rgs: z.array(rgSchema).min(1, 'deve haver pelo menos 1 rg'),
  phones: z.array(phoneSchema).min(1, 'deve haver pelo menos 1 telefone'),
})

type CustomerFormFields = z.infer<typeof customerSchema>

export function useCustomerForm(
  onSubmit: (customerDto: CustomerDto) => void,
  customerDto?: CustomerDto,
) {
  const { control, formState, register, handleSubmit } = useForm<CustomerFormFields>({
    defaultValues: {
      cpf: customerDto?.cpf,
      name: customerDto?.name,
      socialName: customerDto?.socialName,
      rgs: customerDto?.rgs,
      phones: customerDto?.phones,
    },
    resolver: zodResolver(customerSchema),
  })

  const {
    fields: rgFields,
    append: appendRgField,
    remove: removeRgField,
  } = useFieldArray({ control, name: 'rgs' })

  const {
    fields: phoneFields,
    append: appendPhoneField,
    remove: removePhoneField,
  } = useFieldArray({ control, name: 'phones' })

  const addRgField = useCallback(() => {
    appendRgField({ value: '', issueDate: null as unknown as Date })
  }, [appendRgField])

  const addPhoneField = useCallback(() => {
    appendPhoneField({ number: '', codeArea: '' })
  }, [appendPhoneField])

  function handleAppendRgFieldButtonClick() {
    addRgField()
  }

  function handlePopRgFieldButtonClick(rgFieldIndex: number) {
    removeRgField(rgFieldIndex)
  }

  function handleAppendPhoneFieldButtonClick() {
    addPhoneField()
  }

  function handlePopPhoneFieldButtonClick(phoneFieldIndex: number) {
    removePhoneField(phoneFieldIndex)
  }

  function handleFormSubmit(fields: CustomerFormFields) {
    const customerDto: CustomerDto = {
      name: fields.name,
      socialName: fields.socialName,
      cpf: fields.cpf,
      phones: fields.phones,
      rgs: fields.rgs,
    }

    onSubmit(customerDto)
  }

  return {
    rgFields,
    phoneFields,
    formControl: control,
    formErrors: formState.errors,
    registerField: register,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleAppendRgFieldButtonClick,
    handlePopRgFieldButtonClick,
    handleAppendPhoneFieldButtonClick,
    handlePopPhoneFieldButtonClick,
  }
}
