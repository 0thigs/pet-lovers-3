import { useState, useEffect } from 'react'
import { GetAllBreedsUseCase } from '@world-beauty/core/use-cases'
import { petsRepository } from '@/database'

const getBreedsUseCase = new GetAllBreedsUseCase(petsRepository)

export function useMostConsumedProductsAndServicesTableByPetBreed() {
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [breeds, setBreeds] = useState<string[]>([])

  function handleBreedChange(value: string) {
    setSelectedBreed(value)
  }

  async function fetchBreeds() {
    const breedsData = await getBreedsUseCase.execute()
    setBreeds(breedsData)
    if (breedsData.length > 0) {
      setSelectedBreed(breedsData[0])
    }
  }

  useEffect(() => {
    fetchBreeds()
  }, [])

  return {
    selectedBreed,
    breeds,
    handleBreedChange,
  }
} 