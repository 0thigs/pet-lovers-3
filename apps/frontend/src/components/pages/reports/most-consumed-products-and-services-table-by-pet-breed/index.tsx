import { Select, SelectItem } from '@nextui-org/react'
import { MostConsumedProductsTableByPetBreed } from './most-consumed-products-table-by-pet-breed'
import { MostConsumedServicesTableByPetBreed } from './most-consumed-services-table-by-breed'
import { useMostConsumedProductsAndServicesTableByPetBreed } from './use-most-consumed-products-and-services-table-by-pet-breed'

export const MostConsumedProductsAndServicesByPetBreedTable = () => {
  const { selectedBreed, breeds, handleBreedChange } = useMostConsumedProductsAndServicesTableByPetBreed()

  return (
    <div className='space-y-6'>
      <Select
        name='breed'
        className='w-full md:max-w-xs'
        label='Raça de pet'
        selectedKeys={[selectedBreed]}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string
          handleBreedChange(selectedKey)
        }}
        items={breeds.map((breed) => ({ label: breed, value: breed }))}
        required
      >
        {(breed) => (
          <SelectItem key={breed.value} value={breed.value}>
            {breed.value.toLowerCase()}
          </SelectItem>
        )}
      </Select>
      <MostConsumedProductsTableByPetBreed selectedPetBreed={selectedBreed} />
      <MostConsumedServicesTableByPetBreed selectedPetBreed={selectedBreed} />
    </div>
  )
}
