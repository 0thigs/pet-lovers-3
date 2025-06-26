import { ServicesTable } from '@/components/commons/services-table'
import { useMostConsumedServicesTableByPetBreed } from './use-most-consumed-services-table-by-pet-breed'

type Props = {
  selectedPetBreed: string
}

export const MostConsumedServicesTableByPetBreed = ({ selectedPetBreed }: Props) => {
  const {
    services,
    page,
    pagesCount,
    handlePageChange,
  } = useMostConsumedServicesTableByPetBreed(selectedPetBreed)
    
  return (
    <div>
      <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
        Serviços mais consumidos por pet's da raça {selectedPetBreed}
      </h2>
      <ServicesTable
        hasActions={false}
        hasSelection={false}
        services={services}
        page={page}
        pagesCount={pagesCount}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
