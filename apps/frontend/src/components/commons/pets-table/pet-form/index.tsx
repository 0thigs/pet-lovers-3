import { Button, Divider, Input, SelectItem, Select } from '@nextui-org/react'
import { Controller } from 'react-hook-form'

import type { PetDto } from '@world-beauty/core/dtos'
import type { Pet } from '@world-beauty/core/entities'
import { PetType } from '@world-beauty/core/enums'

import { usePetForm } from './use-pet-form'

type PetFormProps = {
  pet?: Pet
  onSubmit: (pet: PetDto) => void
  onCancel: () => void
}

export const PetForm = ({ onCancel, onSubmit, pet }: PetFormProps) => {
  const { customers, formControl, formErrors, registerField, handleFormSubmit } = usePetForm(
    onSubmit,
    pet?.dto,
  )

  return (
    <form onSubmit={handleFormSubmit} className='space-y-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          autoFocus
          label='Nome'
          variant='bordered'
          isInvalid={!!formErrors.name}
          errorMessage={formErrors.name?.message}
          {...registerField('name')}
        />

        <Input
          label='Raça'
          variant='bordered'
          isInvalid={!!formErrors.breed}
          errorMessage={formErrors.breed?.message}
          {...registerField('breed')}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Controller
          name='gender'
          control={formControl}
          render={({ field }) => (
            <Select
              {...field}
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string
                field.onChange(selectedKey)
              }}
              className='w-full md:max-w-xs'
              label='Gênero'
              isInvalid={!!formErrors.gender}
              errorMessage={formErrors.gender?.message}
            >
              <SelectItem key='male' value='male'>
                Macho
              </SelectItem>
              <SelectItem key='female' value='female'>
                Fêmea
              </SelectItem>
            </Select>
          )}
        />

        <Controller
          name='type'
          control={formControl}
          render={({ field }) => (
            <Select
              {...field}
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string
                field.onChange(selectedKey)
              }}
              className='w-full md:max-w-xs'
              label='Tipo de pet'
              items={Object.values(PetType).map((type) => ({ label: type, value: type }))}
              isInvalid={!!formErrors.type}
              errorMessage={formErrors.type?.message ? 'Tipo de pet é obrigatório' : ''}
            >
              {(type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.value.toLocaleLowerCase()}
                </SelectItem>
              )}
            </Select>
          )}
        />
      </div>

      <Controller
        name='customerId'
        control={formControl}
        render={({ field }) => (
          <Select
            {...field}
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string
              field.onChange(selectedKey)
            }}
            label='Cliente'
            items={customers.map((customer) => ({
              label: `Nome: ${customer.name} | CPF: ${customer.cpf.format}`,
              value: customer.id ?? '',
            }))}
            placeholder={customers.length > 0 ? 'Selecione um cliente' : 'Nenhum cliente cadastrado'}
            isDisabled={customers.length === 0}
            isInvalid={!!formErrors.customerId}
            errorMessage={formErrors.customerId?.message}
          >
            {(customer) => (
              <SelectItem key={customer.value} value={customer.value}>
                {customer.label}
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Divider />
      <div className='flex items-center gap-2'>
        <Button type='submit' color='primary' className='mt-3'>
          Enviar
        </Button>
        <Button color='danger' onClick={() => onCancel()} className='mt-3'>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
