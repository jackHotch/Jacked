'use client'

import { ExecuteScriptProps } from '@/types'
import { useDevUpdateWorkouts } from '@/hooks/api/useDevUpdateWorkouts'

const ExecuteScript = ({ params }: ExecuteScriptProps) => {
  const { mutateAsync: updateWorkouts } = useDevUpdateWorkouts()
  const scriptConfig = {
    'update-workouts': {
      title: 'Update Workouts',
      description: 'Update the workout and workout sets tables',
      api: null,
    },
    'update-weights': {
      title: 'Update Weights',
      description: 'Update weight table',
      api: null,
    },
  }

  return <div>{params.scriptId}</div>
}

export default ExecuteScript
