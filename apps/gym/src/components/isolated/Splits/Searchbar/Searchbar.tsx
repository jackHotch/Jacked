'use client'

import styles from './Searchbar.module.css'
import { SplitSearchbarProps, TextInputChangeEvent } from '@/types'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { CloseIcon } from '@gymapp/gymui/CloseIcon'

export const Searchbar = ({ splits }: SplitSearchbarProps) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  const filterSplits = (e: TextInputChangeEvent) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type='text'
        placeholder='Find a Split'
        value={wordEntered}
        onChange={filterSplits}
      />
      <div className={styles.search_icon}>{!wordEntered ? <SearchIcon /> : <CloseIcon onClick={clearInput} />}</div>
    </div>
  )
}
