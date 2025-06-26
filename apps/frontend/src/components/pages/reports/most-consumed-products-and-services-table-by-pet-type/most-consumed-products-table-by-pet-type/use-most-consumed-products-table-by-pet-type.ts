import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import {
  ListProductsByMostComsumptionAndPetTypeUseCase,
} from '@world-beauty/core/use-cases'

import { productsRepository } from '@/database'
import { PetType } from '@world-beauty/core/enums'

const useCase =
  new ListProductsByMostComsumptionAndPetTypeUseCase(productsRepository)

export function useMostConsumedProductsTableByPetType(petType: PetType) {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] =
    useState(0)
 
  const fetchProducts = useCallback(async (page: number) => {
    const { items, itemsCount } =
      await useCase.execute(page, petType)

    setProducts(items.map(Product.create))
    setPage(page)
    setPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [petType])

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  useEffect(() => {
    if (petType) {
      fetchProducts(page)
    }
  }, [fetchProducts, petType, page])

  return {
    products,
    page,
    pagesCount,
    handlePageChange,
  }
}
