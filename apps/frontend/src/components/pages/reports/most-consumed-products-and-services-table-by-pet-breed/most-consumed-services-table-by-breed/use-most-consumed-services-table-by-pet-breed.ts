import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import { ListServicesByMostComsumptionAndPetBreedUseCase } from '@world-beauty/core/use-cases'

import { servicesRepository } from '@/database'

const useCase = new ListServicesByMostComsumptionAndPetBreedUseCase(servicesRepository)

export function useMostConsumedServicesTableByPetBreed(petBreed: string) {
  const [services, setServices] = useState<Service[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)
 
  const fetchServices = useCallback(async (page: number) => {
    if (!petBreed) return
    
    const { items, itemsCount } = await useCase.execute(page, petBreed)

    setServices(items.map(Service.create))
    setPage(page)
    setPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [petBreed])

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  useEffect(() => {
    if (petBreed) {
      fetchServices(page)
    }
  }, [fetchServices, petBreed, page])

  return {
    services,
    page,
    pagesCount,
    handlePageChange,
  }
} 