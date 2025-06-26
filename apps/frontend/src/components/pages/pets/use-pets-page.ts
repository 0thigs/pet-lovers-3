import { useCallback, useEffect, useState } from 'react'

import { Pet } from '@world-beauty/core/entities'
import {
  DeletePetsUseCase,
  ListPetsUseCase,
  RegisterPetUseCase,
  UpdatePetUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'
import type { PetDto } from '@world-beauty/core/dtos'

import { petsRepository } from '@/database'

const registerPetUseCase = new RegisterPetUseCase(petsRepository)
const listPetsUseCase = new ListPetsUseCase(petsRepository)
const updatePetUseCase = new UpdatePetUseCase(petsRepository)
const deletePetsUseCase = new DeletePetsUseCase(petsRepository)

export function usePetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedPetsIds, setSelectedPetsIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchPets = useCallback(async (page: number) => {
    const response = await listPetsUseCase.execute(page)
    setPets(response.items.map(Pet.create))
    setPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
  }, [])

  async function handlePetsSelectionChange(selectedPetsIds: string[]) {
    setSelectedPetsIds(selectedPetsIds)
  }

  async function handlePageChange(page: number) {
    await fetchPets(page)
  }

  async function handleDeleteButtonClick() {
    setSelectedPetsIds([])
    await deletePetsUseCase.execute(selectedPetsIds)
    await fetchPets(1)
  }

  async function handleRegisterPet(petDto: PetDto) {
    await registerPetUseCase.execute(petDto)
    await fetchPets(1)
  }

  async function handleUpdatePet(petDto: PetDto, petId: string) {
    await updatePetUseCase.execute(petDto, petId)
    await fetchPets(1)
  }

  useEffect(() => {
    fetchPets(1)
    setIsFetching(false)
  }, [fetchPets])

  return {
    pets,
    page,
    pagesCount,
    isFetching,
    selectedPetsIds,
    handleRegisterPet,
    handleUpdatePet,
    handleDeleteButtonClick,
    handlePetsSelectionChange,
    handlePageChange,
  }
}
