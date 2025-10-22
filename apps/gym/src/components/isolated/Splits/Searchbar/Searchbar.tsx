'use client'

import styles from './Searchbar.module.css'
import { SplitSearchbarProps, TextInputChangeEvent } from '@/types'
import { useState, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { CloseIcon } from '@gymapp/gymui/CloseIcon'
import { useOutsideClick } from '@/hooks'

export const Searchbar = ({ splits }: SplitSearchbarProps) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')
  const containerRef = useRef()
  useOutsideClick(containerRef, () => setFilteredData([]))

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  const filterSplits = (e: TextInputChangeEvent) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = splits?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord === '') setFilteredData([])
    else setFilteredData(newFilter)
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          type='text'
          placeholder='Find a Split'
          value={wordEntered}
          onChange={filterSplits}
        />
        <div className={styles.search_icon}>{!wordEntered ? <SearchIcon /> : <CloseIcon onClick={clearInput} />}</div>
      </div>
      {filteredData.length > 0 && (
        <div className={styles.list_container}>
          {filteredData.map((split, i) => {
            return (
              <div className={styles.list_item}>
                <div>
                  <span>{split.name}</span>
                  {split.is_active ? <span> *</span> : null}
                </div>
                <div className={styles.list_item_details}>
                  <span>{split.total_template_days} days per week</span>
                  <span>{split.total_template_exercises} total exercises</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
