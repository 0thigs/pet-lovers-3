import { Select, SelectItem } from '@nextui-org/react'

import { PageTitle } from '@/components/commons/page-title'

import { useReportsPage } from './use-reports-page'
import { CustomersByLessConsumptionTable } from './customers-by-less-consumption-table'
import { CustomersByMostConsumptionTable } from './customers-by-most-consumption-table'
import { CustomersByMostSpendingTable } from './customers-by-most-spending-table'
import { MostConsumedProductsAndServicesTable } from './most-consumed-products-and-services-table'
import { MostConsumedProductsAndServicesByPetTypeTable } from './most-consumed-products-and-services-table-by-pet-type'
import { MostConsumedProductsAndServicesByPetBreedTable } from './most-consumed-products-and-services-table-by-pet-breed'

export const ReportsPage = () => {
  const { selectedList, handleSelectChange } = useReportsPage()

  return (
    <div className='flex flex-col gap-3 pb-24'>
      <PageTitle>Relatórios</PageTitle>

      <Select
        label='Selecione uma lista'
        defaultSelectedKeys={['customers-by-most-consumption']}
        onChange={(e) => handleSelectChange(e.target.value)}
        className='max-w-md'
      >
        <SelectItem key='most-consumed-products-and-services'>
          Produtos e serviços mais consumidos
        </SelectItem>
        <SelectItem key='most-consumed-products-and-services-by-pet-type'>
          Produtos e serviços mais consumidos por tipo de pet
        </SelectItem>
        <SelectItem key='most-consumed-products-and-services-by-pet-breed'>
          Produtos e serviços mais consumidos por raça de pet
        </SelectItem>
        <SelectItem key='customers-by-most-consumption'>
          10 clientes que mais consumiram produtos ou serviços
        </SelectItem>
        <SelectItem key='customers-by-less-consumption'>
          10 clientes que menos consumiram produtos ou serviços
        </SelectItem>
        <SelectItem key='customers-by-most-spending'>
          5 clientes que mais consumiram em valor
        </SelectItem>
      </Select>

      <div className='mt-6'>
        {selectedList === 'customers-by-most-consumption' && (
          <CustomersByMostConsumptionTable />
        )}
        {selectedList === 'customers-by-less-consumption' && (
          <CustomersByLessConsumptionTable />
        )}
        {selectedList === 'customers-by-most-spending' && (
          <CustomersByMostSpendingTable />
        )}
        {selectedList === 'most-consumed-products-and-services' && (
          <MostConsumedProductsAndServicesTable />
        )}
        {selectedList === 'most-consumed-products-and-services-by-pet-type' && (
          <MostConsumedProductsAndServicesByPetTypeTable />
        )}
        {selectedList === 'most-consumed-products-and-services-by-pet-breed' && (
          <MostConsumedProductsAndServicesByPetBreedTable />
        )}
      </div>
    </div>
  )
}
