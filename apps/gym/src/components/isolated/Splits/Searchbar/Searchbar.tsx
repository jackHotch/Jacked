'use client'

import styles from './Searchbar.module.css'
import { SplitSearchbarProps, TextInputChangeEvent } from '@/types'
import { useState, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { CloseIcon } from '@gymapp/gymui/CloseIcon'

export const Searchbar = ({ filterSplits }: SplitSearchbarProps) => {
  const [wordEntered, setWordEntered] = useState('')
  const containerRef = useRef()

  const clearInput = () => {
    setWordEntered('')
    filterSplits('')
  }

  const handleChange = (e: TextInputChangeEvent) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    filterSplits(searchWord)
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          type='text'
          placeholder='Find a Split'
          value={wordEntered}
          onChange={handleChange}
        />
        <div className={styles.search_icon}>{!wordEntered ? <SearchIcon /> : <CloseIcon onClick={clearInput} />}</div>
      </div>
    </div>
  )
}
