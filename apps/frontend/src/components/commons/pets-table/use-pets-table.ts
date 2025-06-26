import type { Selection } from '@nextui-org/react'

import type { PetDto } from '@world-beauty/core/dtos'
import type { Pet } from '@world-beauty/core/entities'

type UsePetsTableProps = {
  pets: Pet[]
  onPageChange?: (page: number) => void
  onUpdatePet?: (petDto: PetDto, petsId: string) => void
  onPetsSelectionChange?: (petsIds: string[]) => void
}

export function usePetsTable({
  pets,
  onPageChange,
  onPetsSelectionChange,
  onUpdatePet,
}: UsePetsTableProps) {
  async function handlePetsSelectionChange(petsSelection: Selection) {
    let selectedPetsIds: string[] = []

    if (petsSelection === 'all') {
      selectedPetsIds = pets.map((pet) => pet.id)
    } else {
      selectedPetsIds = Array.from(petsSelection).map(String)
    }

    if (onPetsSelectionChange) onPetsSelectionChange(selectedPetsIds)
  }

  function handlePageChange(page: number) {
    if (onPageChange) onPageChange(page)
  }

  async function handleUpdatePet(petDto: PetDto, petId: string) {
    if (onUpdatePet) onUpdatePet(petDto, petId)
  }

  return {
    handlePetsSelectionChange,
    handleUpdatePet,
    handlePageChange,
  }
}
