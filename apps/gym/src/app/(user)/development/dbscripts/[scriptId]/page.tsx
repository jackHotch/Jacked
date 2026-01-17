'use client'

import { ScriptIdProps } from '@/types'
import styles from './scriptid.module.css'
import { useDevUpdateWorkouts } from '@/hooks/api/useDevUpdateWorkouts'
import { Button } from '@gymapp/gymui/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { ExecuteScript } from '@/components/isolated/Development/ExecuteScript/ExecuteScript'

const ScriptId = ({ params }: ScriptIdProps) => {
  const scriptId = params.scriptId
  const router = useRouter()
  const { mutateAsync: updateWorkouts } = useDevUpdateWorkouts()
  const scriptConfig = {
    'update-workouts': {
      title: 'Update Workouts',
      description: 'Upload a file to replace the contents of the workout and workout_sets tables',
      onClick: null,
    },
    'update-weights': {
      title: 'Update Weights',
      description: 'Update weight table',
      onClick: null,
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.back_button}>
        <Button.Text onClick={() => router.push('/development/dbscripts')}>
          <ArrowBackIcon fontSize='small' />
          Back to scripts
        </Button.Text>
      </div>

      <ExecuteScript
        title={scriptConfig[scriptId].title}
        description={scriptConfig[scriptId].description}
        onClick={scriptConfig[scriptId].onClick}
      />
    </div>
  )
}

export default ScriptId
