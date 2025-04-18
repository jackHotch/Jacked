'use client'

import styles from './Home.module.css'
import { Button } from '@gymapp/gymui/Button'
import { useRouter } from 'next/navigation'
import { useFeatureFlag } from '@/hooks'

const Home = () => {
  const { data } = useFeatureFlag('Welcome_Message')
  const router = useRouter()

  const handleClick = () => {
    window.open('https://github.com/jackHotch/Gym-App', '_blank')
  }

  return (
    <div className={styles.container}>
      <h1>
        Jack Hotchkiss's Gym Tracking App
        <img src='/images/dumbbell-blue.png' alt='Dumbbell Icon' width={45} />
      </h1>
      <p className={styles.description}>{data?.message}</p>
      <p className={styles.thanks}>Thank You!</p>
      <div className={styles.buttons}>
        <Button.Primary onClick={() => router.push('/dashboard')} size='medium'>
          Dashboard
        </Button.Primary>
        <Button.Secondary onClick={handleClick} size='medium'>
          GitHub
        </Button.Secondary>
      </div>
    </div>
  )
}

export default Home
