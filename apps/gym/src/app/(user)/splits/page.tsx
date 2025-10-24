'use client'

import styles from './splits.module.css'
import { Split } from '@/types'
import { useAllSplitsSummary } from '@/hooks/api/useAllSplitsSummary'
import { useEffect, useState } from 'react'
import { Searchbar } from '@/components/isolated/Splits/Searchbar/Searchbar'
import { SplitCard } from '@/components/isolated/Splits/split-card/split-card'

const Splits = () => {
  const { data: splits } = useAllSplitsSummary()
  const [filteredData, setFilteredData] = useState(splits?.data)

  useEffect(() => {
    setFilteredData(splits?.data)
  }, [splits])

  const filterSplits = (searchWord: string) => {
    const newFilter = splits?.data.filter((split) => {
      return split.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord === '') setFilteredData(splits?.data)
    else setFilteredData(newFilter)
  }

  return (
    <>
      <Searchbar filterSplits={filterSplits} />
      {filteredData?.map((split: Split, key: number) => {
        return <SplitCard split={split} key={key} />
      })}
    </>
  )
}

export default Splits
