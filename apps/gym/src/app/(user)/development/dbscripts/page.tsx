'use client'

import { DatabaseScripts } from '@/components/isolated/Development/DatabaseScripts/DatabaseScripts'
import styles from './dbscripts.module.css'
import { Button } from '@gymapp/gymui/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'

const dbscripts = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.back_button}>
        <Button.Text onClick={() => router.push('/development')}>
          <ArrowBackIcon fontSize='small' />
          Back to settings
        </Button.Text>
      </div>

      <DatabaseScripts />
    </div>
  )
}

export default dbscripts
