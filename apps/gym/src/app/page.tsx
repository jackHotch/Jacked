'use client'

import styles from './Home.module.css'
import { Button } from '@gymapp/gymui/Button'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  const handleClick = () => {
    const newWindow = window.open('https://github.com/jackHotch/Gym-App', '_blank')
  }

  return (
    <div className={styles.container}>
      <h1>Jack Hotchkiss's Gym Tracking App</h1>
      <p className={styles.description}>
        Hello, this is a personal project I have am currently working on. It will be a web
        app to track my progress in the gym. Currently only the Record and Weight pages
        have content. Please feel free to play around with this website. I have linked the
        GitHub repository for this project below.
      </p>
      <p className={styles.thanks}>Thank You!</p>
      <Button.Primary onClick={handleClick} size='medium'>
        GitHub
      </Button.Primary>
    </div>
  )
}

export default Home
