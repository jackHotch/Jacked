'use client'

import styles from './splits.module.css'
import { Split } from '@/types'
import { useAllSplitsSummary } from '@/hooks/api/useAllSplitsSummary'
import { useEffect, useState } from 'react'
import { Searchbar } from '@/components/isolated/Splits/Searchbar/Searchbar'
import { SplitCard } from '@/components/isolated/Splits/split-card/split-card'
import { Button } from '@gymapp/gymui/Button'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'

const Splits = () => {
  const { data: splits } = useAllSplitsSummary()
  const [filteredData, setFilteredData] = useState(splits?.data)
  const router = useRouter()

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
      <div className={styles.header}>
        <Searchbar filterSplits={filterSplits} />
        <Button.Primary onClick={() => router.push('/splits/new')}>
          <AddIcon />
          Create
        </Button.Primary>
      </div>
      <div className={styles.split_card_list}>
        {filteredData?.map((split: Split, key: number) => {
          return <SplitCard split={split} key={key} />
        })}
      </div>
    </>
  )
}

export default Splits
