import { useState } from 'react'

export function useReportsPage() {
  const [selectedList, setSelectedList] = useState('customers-by-most-consumption')

  function handleSelectChange(selectedList: string) {
    setSelectedList(selectedList)
  }

  return {
    selectedList,
    handleSelectChange,
  }
}
