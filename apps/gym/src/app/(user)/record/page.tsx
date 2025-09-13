'use client'

import styles from './Record.module.css'
import Link from 'next/link'
import { useCurrentSplit } from '@/hooks/api/useCurrentSplit'
import { Loading } from '@gymapp/gymui/Loading'
import { Button } from '@gymapp/gymui/Button'

const Record = () => {
  const { data: currentSplit, isLoading, isEmpty } = useCurrentSplit()

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading.Text
          fontSize='3rem'
          pulseSize={12}
          sx={{ gap: '20px', height: '57.5px' }}
        >
          Getting your Current Split
        </Loading.Text>
      ) : isEmpty ? (
        <h1 className={styles.split_name}>No Split Created</h1>
      ) : (
        <h1 className={styles.split_name}>{currentSplit?.data.name}</h1>
      )}
      <Link href='/record/workout' className={styles.button}>
        <Button.Primary size='xlarge'>Start Workout</Button.Primary>
      </Link>
    </div>
  )
}

export default Record
