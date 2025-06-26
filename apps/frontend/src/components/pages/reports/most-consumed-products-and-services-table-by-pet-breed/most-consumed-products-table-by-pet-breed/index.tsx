import { ProductsTable } from '@/components/commons/products-table'
import { useMostConsumedProductsTableByPetBreed } from './use-most-consumed-products-table-by-pet-breed'

type Props = {
  selectedPetBreed: string
}

export const MostConsumedProductsTableByPetBreed = ({ selectedPetBreed }: Props) => {
  const {
    products,
    page,
    pagesCount,
    handlePageChange,
  } = useMostConsumedProductsTableByPetBreed(selectedPetBreed)
    
  return (
    <div>
      <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
        Produtos mais consumidos por pet's da raça {selectedPetBreed}
      </h2>
      <ProductsTable
        hasActions={false}
        hasSelection={false}
        products={products}
        page={page}
        pagesCount={pagesCount}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
