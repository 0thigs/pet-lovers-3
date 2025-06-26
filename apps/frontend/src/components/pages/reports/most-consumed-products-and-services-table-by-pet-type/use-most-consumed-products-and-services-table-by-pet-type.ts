import { useState } from "react";
import { PetType } from "@world-beauty/core/enums";

export function useMostConsumedProductsAndServicesTableByPetType() {
  const [selectedPetType, setSelectedPetType] = useState<PetType>(PetType.CACHORRO)

  function handlePetTypeChange(value: string) {
    setSelectedPetType(value as PetType)
  }

  return {
    selectedPetType,
    handlePetTypeChange,
  }
}