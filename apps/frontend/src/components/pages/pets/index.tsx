import { Button } from '@nextui-org/react'

import type { PetDto } from '@world-beauty/core/dtos'

import { PageTitle } from '@/components/commons/page-title'
import { Dialog } from '@/components/commons/dialog'
import { Icon } from '@/components/commons/icon'
import { PetForm } from '@/components/commons/pets-table/pet-form'
import { PetsTable } from '@/components/commons/pets-table'
import { usePetsPage } from './use-pets-page'

export const PetsPage = () => {
  const {
    pets,
    page,
    pagesCount,
    isFetching,
    selectedPetsIds,
    handlePetsSelectionChange,
    handleDeleteButtonClick,
    handlePageChange,
    handleRegisterPet,
    handleUpdatePet,
  } = usePetsPage()

  return (
    <div className='flex flex-col gap-3 pb-24'>
    <PageTitle>Pet's</PageTitle>

    <div className='flex items-center gap-2'>
      <Dialog
        title='Adicionar pet'
        trigger={
          (openDialog) => (
            <Button
              endContent={<Icon name='add' size={20} />}
              radius='sm'
              onClick={openDialog}
              className='bg-zinc-800 text-zinc-50 w-max'
            >
              Cadastrar pet
            </Button>
          )
        }
      >
        {(closeDialog) => (
          <PetForm
            onCancel={closeDialog}
            onSubmit={async (petDto) => {
              closeDialog()
              await handleRegisterPet(petDto)
            }}
          />
        )}
      </Dialog>
      {selectedPetsIds.length > 0 && (
        <Button
          radius='sm'
          color='danger'
          onClick={() => handleDeleteButtonClick()}
        >
          Deletar pet(s)
        </Button>
      )}
    </div>

    <PetsTable
      hasActions={true}
      hasSelection={true}
      pets={pets}
      isLoading={isFetching}
      page={page}
      pagesCount={pagesCount}
      selectedPetsIds={selectedPetsIds}
      onUpdatePet={(petDto: PetDto, petId: string) =>
        handleUpdatePet(petDto, petId)
      }
      onPageChange={(page) => handlePageChange(page)}
      onPetsSelectionChange={(petsIds) =>
        handlePetsSelectionChange(petsIds)
      }
    />
  </div>
  )
}
