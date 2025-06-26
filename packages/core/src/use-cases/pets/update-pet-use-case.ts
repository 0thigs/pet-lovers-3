import { Pet } from '../../domain/entities'
import type { PetDto } from '../../dtos'
import type { IPetsRepository } from '../../interfaces/repositories'

export class UpdatePetUseCase {
  constructor(private readonly petsRepository: IPetsRepository) {}

  async execute(petDto: PetDto, petId: string) {
    const pet = Pet.create({ ...petDto, id: petId })
    await this.petsRepository.update(pet)
  }
}
