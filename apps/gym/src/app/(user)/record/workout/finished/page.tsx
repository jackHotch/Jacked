'use client'

import styles from './Finished.module.css'
import { useWorkoutNumber } from '@/hooks'
import { Button } from '@gymapp/gymui/Button'
import { useRouter } from 'next/navigation'

const Finished = () => {
  const { data: workout } = useWorkoutNumber()
  const router = useRouter()

  return (
    <div className={styles.created}>
      <p>Workout #{workout?.data.count + 1} Recorded!</p>
      <Button.Primary
        size='xlarge'
        sx={{ marginTop: '30px' }}
        onClick={() => router.push('/record')}
      >
        Done
      </Button.Primary>
    </div>
  )
}

export default Finished
