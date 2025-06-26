import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import { ListProductsByMostComsumptionAndPetBreedUseCase } from '@world-beauty/core/use-cases'

import { productsRepository } from '@/database'

const useCase = new ListProductsByMostComsumptionAndPetBreedUseCase(productsRepository)

export function useMostConsumedProductsTableByPetBreed(petBreed: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)
 
  const fetchProducts = useCallback(async (page: number) => {
    if (!petBreed) return
    
    const { items, itemsCount } = await useCase.execute(page, petBreed)

    setProducts(items.map(Product.create))
    setPage(page)
    setPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [petBreed])

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  useEffect(() => {
    if (petBreed) {
      fetchProducts(page)
    }
  }, [fetchProducts, petBreed, page])

  return {
    products,
    page,
    pagesCount,
    handlePageChange,
  }
} 