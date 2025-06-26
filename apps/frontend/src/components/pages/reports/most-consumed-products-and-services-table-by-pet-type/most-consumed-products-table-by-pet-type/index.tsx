import { ProductsTable } from '@/components/commons/products-table'
import { useMostConsumedProductsTableByPetType } from './use-most-consumed-products-and-services-table-by-pet-type'
import { PetType } from '@world-beauty/core/enums'

type Props = {
  selectedPetType: PetType
}

export const MostConsumedProductsTableByPetType = ({ selectedPetType }: Props) =>  {
  const {
    products,
    page,
    pagesCount,
    handlePageChange,
  } = useMostConsumedProductsTableByPetType(selectedPetType)
    
  return (
    <div>
      <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
        Produtos mais consumidos por pet's do tipo{' '}
        {selectedPetType.toLocaleLowerCase()}
      </h2>
      <ProductsTable
        hasActions={false}
        hasSelection={false}
        products={products}
        page={page}
        pagesCount={pagesCount}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  )
}
