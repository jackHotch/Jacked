'use client'

import { Searchbar } from '@/components/isolated/Splits/Searchbar/Searchbar'
import styles from './splits.module.css'
import { useAllSplitsSummary } from '@/hooks/api/useAllSplitsSummary'

const Splits = () => {
  const { data } = useAllSplitsSummary()
  return (
    <div>
      <div>
        <Searchbar splits={data} />
      </div>
    </div>
  )
}

export default Splits
