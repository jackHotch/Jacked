'use client'

import { useCurrentWeight } from '@/hooks/api/useCurrentWeight'
import styles from './HeaderDesktop.module.css'
import { HeaderDesktopProps } from '@/types'
import { useCurrentSplit } from '@/hooks/api/useCurrentSplit'
import Link from 'next/link'
import { Button } from '@gymapp/gymui/Button'
import ClipLoader from 'react-spinners/ClipLoader'

export const HeaderDesktop = ({}: HeaderDesktopProps) => {
  const {
    data: currentWeight,
    isLoading: isWeightLoading,
    isEmpty: isWeightEmpty,
  } = useCurrentWeight()
  const {
    data: currentSplit,
    isLoading: isSplitLoading,
    isEmpty: isSplitEmpty,
  } = useCurrentSplit()

  return (
    <div className={styles.container}>
      <div>
        {isWeightLoading ? (
          <ClipLoader size={10} />
        ) : isWeightEmpty ? (
          <Link href='/weight'>
            <Button.Text sx={{ display: 'inline' }}>
              Start tracking your weight
            </Button.Text>
          </Link>
        ) : (
          <span>{currentWeight.data.weight} lbs</span>
        )}
        <span className={styles.label}> | Weight </span>
      </div>

      <div>
        {isSplitLoading ? (
          <ClipLoader size={10} />
        ) : isSplitEmpty ? (
          <Link href='/splits'>
            <Button.Text sx={{ display: 'inline' }}>Create your first Split</Button.Text>
          </Link>
        ) : (
          <span>{currentSplit.data.name}</span>
        )}
        <span className={styles.label}> | Current Split </span>
      </div>

      {currentSplit && (
        <div>
          Chest and Triceps
          <span className={styles.label}> | Next Workout </span>
        </div>
      )}
    </div>
  )
}
