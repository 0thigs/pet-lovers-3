import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import {
  ListServicesByMostComsumptionAndPetTypeUseCase,
} from '@world-beauty/core/use-cases'

import { servicesRepository } from '@/database'
import { PetType } from '@world-beauty/core/enums'

const useCase =
  new ListServicesByMostComsumptionAndPetTypeUseCase(servicesRepository)

export function useMostConsumedServicesTableByPetType(petType: PetType) {
  const [services, setServices] = useState<Service[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] =
    useState(0)
 
  const fetchServices = useCallback(async (page: number) => {
    const { items, itemsCount } =
      await useCase.execute(page, petType)

    setServices(items.map(Service.create))
    setPage(page)
    setPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [petType])

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }


  useEffect(() => {
    if (petType) {
      fetchServices(page)
    }
  }, [fetchServices, petType, page])

  return {
    services,
    page,
    pagesCount,
    handlePageChange,
  }
}
