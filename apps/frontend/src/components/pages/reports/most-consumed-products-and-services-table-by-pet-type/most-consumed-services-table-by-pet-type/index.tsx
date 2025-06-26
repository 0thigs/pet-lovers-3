import { ServicesTable } from '@/components/commons/services-table'
import { useMostConsumedServicesTableByPetType } from './use-most-consumed-services-table-by-pet-type'
import { PetType } from '@world-beauty/core/enums'

type Props = {
  selectedPetType: PetType
}

export const MostConsumedServicesTableByPetType = ({ selectedPetType }: Props) =>  {
  const {
    services,
    page,
    pagesCount,
    handlePageChange,
  } = useMostConsumedServicesTableByPetType(selectedPetType)
    
  return (
    <div>
      <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
        Produtos mais consumidos por pet's do tipo{' '}
        {selectedPetType.toLocaleLowerCase()}
      </h2>
      <ServicesTable
        hasActions={false}
        hasSelection={false}
        services={services}
        page={page}
        pagesCount={pagesCount}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  )
}
