import { Select, SelectItem } from '@nextui-org/react'
import { MostConsumedProductsTableByPetType } from './most-consumed-products-table-by-pet-type'
import { useMostConsumedProductsAndServicesTableByPetType } from './use-most-consumed-products-and-services-table-by-pet-type'
import { PetType } from '@world-beauty/core/enums'
import { MostConsumedServicesTableByPetType } from './most-consumed-services-table-by-pet-type'

export const MostConsumedProductsAndServicesByPetTypeTable = () =>  {
  const { selectedPetType, handlePetTypeChange } = useMostConsumedProductsAndServicesTableByPetType()

    return (
      <div className='space-y-6'>
         <Select
          name='type'
          className='w-full md:max-w-xs'
          label='Tipo de pet'
          selectedKeys={[selectedPetType]}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string
            handlePetTypeChange(selectedKey)
          }}
          items={Object.values(PetType).map((type) => ({ label: type, value: type }))}
          required
        >
          {(type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.value.toLocaleLowerCase()}
            </SelectItem>
          )}
        </Select>
        <MostConsumedProductsTableByPetType selectedPetType={selectedPetType} />
        <MostConsumedServicesTableByPetType selectedPetType={selectedPetType} />
      </div>
    )
}
