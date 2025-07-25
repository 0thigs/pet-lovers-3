import { Button } from '@nextui-org/react'

import { PageTitle } from '@/components/commons/page-title'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { useServicesPage } from './use-services-page'
import { ServicesTable } from '@/components/commons/services-table'
import { ServiceForm } from '@/components/commons/services-table/service-form'

export const ServicesPage = () => {
  const {
    page,
    Services,
    isFetching,
    pagesCount,
    selectedServicesIds,
    handleDeleteButtonClick,
    handleRegisterService,
    handlePageChange,
    handleServicesSelectionChange,
    handleUpdateService,
  } = useServicesPage()

  return (
    <div className='flex flex-col gap-3 pb-24'>
      <PageTitle>Serviços</PageTitle>

      <div className='flex items-center gap-2'>
        <Dialog
          title='Adicionar serviço'
          trigger={(openDialog) => (
            <Button
              endContent={<Icon name='add' size={20} />}
              radius='sm'
              className='bg-zinc-800 text-zinc-50 w-max'
              onClick={openDialog}
            >
              Cadastrar serviço
            </Button>
          )}
        >
          {(closeDialog) => (
            <ServiceForm
              onCancel={closeDialog}
              onSubmit={(serviceDto) => handleRegisterService(serviceDto, closeDialog)}
            />
          )}
        </Dialog>
        {selectedServicesIds.length > 0 && (
          <Button radius='sm' color='danger' onClick={() => handleDeleteButtonClick()}>
            Deletar serviço(s)
          </Button>
        )}
      </div>

      <div className='w-full'>
        <ServicesTable
          hasActions={true}
          hasSelection={true}
          services={Services}
          page={page}
          isLoading={isFetching}
          pagesCount={pagesCount}
          selectedServicesIds={selectedServicesIds}
          onUpdateService={handleUpdateService}
          onPageChange={handlePageChange}
          onServicesSelectionChange={handleServicesSelectionChange}
        />
      </div>
    </div>
  )
}
