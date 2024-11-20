'use client'

import styles from './Home.module.css'
import { Button } from '@gymapp/gymui/Button'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    window.open('https://github.com/jackHotch/Gym-App', '_blank')
  }

  return (
    <div className={styles.container}>
      <h1>
        Jack Hotchkiss's Gym Tracking App{' '}
        <img src='/images/dumbbell-blue.png' alt='Dumbbell Icon' width={45} />
      </h1>
      <p className={styles.description}>
        Hi, this is a personal project I am currently working on. It will be a web app to
        track my progress in the gym. Currently only the Record and Weight pages have
        content. Please feel free to play around with this website and I have linked the
        GitHub repository for this project below if you want to check it out.
      </p>
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
